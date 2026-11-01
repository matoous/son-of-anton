import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
const validators = {};
for (const kind of ['plugin', 'mcp']) {
  validators[kind] = ajv.compile(readJson(join(root, `schemas/agent-plugins/1.0.0/${kind}.schema.json`)));
}

function validateJson(file, kind) {
  const data = readJson(file);
  assert(validators[kind](data), `${relative(root, file)}: ${ajv.errorsText(validators[kind].errors)}`);
  return data;
}

function containedPath(base, path) {
  assert(typeof path === 'string' && path.startsWith('./'), `Expected a ./-prefixed path: ${path}`);
  const target = realpathSync(resolve(base, path));
  const suffix = relative(realpathSync(base), target);
  assert(!isAbsolute(suffix) && suffix !== '..' && !suffix.startsWith(`..${sep}`),
    `Path leaves its plugin or marketplace: ${path}`);
  return target;
}

function countSkills(pluginRoot) {
  if (!existsSync(join(pluginRoot, 'skills'))) return 0;
  const directory = containedPath(pluginRoot, './skills');
  const skills = readdirSync(directory, { withFileTypes: true }).filter((entry) =>
    entry.isDirectory() && !entry.name.startsWith('.') &&
    existsSync(join(directory, entry.name, 'SKILL.md')));
  for (const skill of skills) {
    const file = containedPath(pluginRoot, `./skills/${skill.name}/SKILL.md`);
    assert(statSync(file).isFile(), `Not a skill file: ${file}`);
  }
  return skills.length;
}

const catalog = readJson(join(root, '.agents/plugins/marketplace.json'));
assert(catalog.name && Array.isArray(catalog.plugins) && catalog.plugins.length, 'Invalid marketplace');
const names = new Set();
for (const entry of catalog.plugins) {
  assert(!names.has(entry.name), `Duplicate plugin: ${entry.name}`);
  names.add(entry.name);
  assert.equal(entry.source?.source, 'local', 'Use local paths within this repo');
  assert(entry.policy?.installation && entry.policy?.authentication && entry.category,
    `Missing marketplace policy or category: ${entry.name}`);
  const pluginRoot = containedPath(root, entry.source.path);
  const manifest = validateJson(containedPath(pluginRoot, './plugin.json'), 'plugin');
  assert.equal(manifest.name, entry.name, 'Marketplace and plugin names differ');
  const skills = countSkills(pluginRoot);
  const servers = existsSync(join(pluginRoot, 'mcp.json'))
    ? Object.entries(validateJson(containedPath(pluginRoot, './mcp.json'), 'mcp').mcpServers)
    : [];
  assert(skills || servers.length, `Plugin has no skills or MCP servers: ${entry.name}`);
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
  console.log(`${entry.name}: ${skills} skills, ${servers.length} MCP servers (${entry.source.path})`);
}
