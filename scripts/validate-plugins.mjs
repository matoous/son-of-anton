import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const catalog = readJson(join(root, '.agents/plugins/marketplace.json'));
const pluginNames = new Set();
const ajv = new Ajv2020({ allErrors: true });
const validators = Object.fromEntries(['plugin', 'mcp'].map((kind) => [
  kind, ajv.compile(readJson(join(root, `schemas/agent-plugins/1.0.0/${kind}.schema.json`))),
]));

function validate(kind, file) {
  const data = readJson(file);
  assert(validators[kind](data), `${file}: ${ajv.errorsText(validators[kind].errors)}`);
  return data;
}

function containedPath(base, path) {
  assert.equal(typeof path, 'string', 'Paths must be strings');
  assert(path.startsWith('./'), `Expected a ./-prefixed path: ${path}`);
  const resolved = realpathSync(resolve(base, path));
  const suffix = relative(realpathSync(base), resolved);
  assert(!isAbsolute(suffix) && suffix !== '..' && !suffix.startsWith('../'),
    `Path leaves its plugin or marketplace: ${path}`);
  return resolved;
}

function skillFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || entry.name.startsWith('.')) return [];
    const path = join(directory, entry.name, 'SKILL.md');
    return existsSync(path) ? [containedPath(directory, `./${entry.name}/SKILL.md`)] : [];
  });
}

assert(catalog.name && Array.isArray(catalog.plugins), 'Invalid marketplace');
assert(catalog.plugins.length > 0, 'Marketplace has no plugins');
for (const entry of catalog.plugins) {
  assert(!pluginNames.has(entry.name), `Duplicate plugin: ${entry.name}`);
  pluginNames.add(entry.name);
  assert.equal(entry.source?.source, 'local', 'Use local paths within this repo');
  assert(entry.policy?.installation && entry.policy?.authentication && entry.category,
    `Missing marketplace policy or category: ${entry.name}`);
  const pluginRoot = containedPath(root, entry.source.path);
  const manifest = validate('plugin', containedPath(pluginRoot, './plugin.json'));
  assert.equal(manifest.name, entry.name, 'Marketplace and plugin names differ');
  assert(/^\d+\.\d+\.\d+$/.test(manifest.version), `Invalid version: ${entry.name}`);
  assert(manifest.description, `Missing description: ${entry.name}`);
  const roots = ['./skills/'];
  const names = new Set();
  for (const path of roots) {
    const skillRoot = containedPath(pluginRoot, path);
    assert(statSync(skillRoot).isDirectory(), `Not a skill directory: ${path}`);
    for (const file of skillFiles(skillRoot)) {
      const text = readFileSync(file, 'utf8');
      const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
      assert(frontmatter, `Missing frontmatter: ${file}`);
      const name = frontmatter.match(/^name:\s*([^\r\n]+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
      assert(name && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name), `Invalid skill name: ${file}`);
      assert(/^description:\s*\S/m.test(frontmatter), `Missing description: ${file}`);
      assert(!names.has(name), `Duplicate skill in ${entry.name}: ${name}`);
      names.add(name);
    }
  }
  assert(names.size > 0, `Plugin has no discoverable skills: ${entry.name}`);
  const mcpFile = join(pluginRoot, 'mcp.json');
  const servers = existsSync(mcpFile)
    ? Object.entries(validate('mcp', containedPath(pluginRoot, './mcp.json')).mcpServers)
    : [];
  for (const [name, server] of servers) {
    if (server.type === 'stdio') {
      if (server.command.startsWith('./')) containedPath(pluginRoot, server.command);
      if (server.cwd?.startsWith('./')) containedPath(pluginRoot, server.cwd);
    } else {
      const url = new URL(server.url);
      assert(!url.username && !url.password && !url.hash, `Invalid MCP URL: ${name}`);
      assert(url.protocol === 'https:' ||
        (url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)),
        `Remote MCP requires HTTPS: ${name}`);
    }
  }
  console.log(`${entry.name}: ${names.size} skills, ${servers.length} MCP servers (${entry.source.path})`);
}
