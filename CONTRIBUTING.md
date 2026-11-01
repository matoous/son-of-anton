# Contributing

## Check the collection

Requires Node.js 22.20+ and Git. From the repository root:

```sh
npm ci --ignore-scripts
npm run check
```

The check validates plugin manifests and MCP configuration against the pinned
official schemas. It also checks catalog references, package paths, discoverable
skill files, and MCP URLs. GitHub Actions runs the same command. Installed
plugins do not need these development dependencies.

## Install a local checkout in Codex

From this checkout, register the marketplace and install the package you changed:

```sh
codex plugin marketplace add .
codex plugin add son-of-anton@son-of-anton
```

Use `rex@son-of-anton` or `incident-io@son-of-anton` for the other packages.
Codex loads a cached copy: rerun `codex plugin add` after edits, then start a new
session. If the marketplace is already registered from GitHub, first run
`codex plugin marketplace remove son-of-anton` to switch to the local source.
To switch back, remove the local marketplace and use the README's GitHub commands.

For another assistant, install from the local checkout using its skills CLI flag:

```sh
npx skills@1.7.4 add . --full-depth --agent claude-code
```

## Add or change a skill

Create `son-of-anton/skills/<name>/SKILL.md` with `name` and `description` in YAML
frontmatter. Keep references and helpers alongside it. New skills in an existing
package need no per-skill manifest or private dotfiles entry.

For a new plugin, create its directory and root `plugin.json`, then add one entry
to `.agents/plugins/marketplace.json`. A package can contain `skills/`, `mcp.json`,
or both; MCP-only packages need no placeholder skill. Target Agent Plugins 1.0.0;
put Codex presentation settings under `extensions.com.openai`. Include upstream
license notices. Bump the changed plugin's version before a release.

## Vendor upstream skills

Use the native skills CLI inside the upstream package. For example:

```sh
cd third_party/incidentio
npx --yes skills@1.7.4 add incident-io/skills --skill catalog --agent codex --copy --yes
npx skills@1.7.4 list
npx skills@1.7.4 update --project --yes
```

The CLI owns `skills-lock.json`. Its normal destination, `.agents/skills`, is a
directory alias pointing to `../skills`, so updates write to the portable
package's real `skills/` directory. Keep one copy of the skill files.

For another upstream, create a real `skills/` directory and an
`.agents/skills -> ../skills` alias, then add its plugin manifest and catalog
entry. To pin a revision, pass a URL such as
`https://github.com/OWNER/REPO/tree/COMMIT-SHA` to `skills add`.

Review local edits before updating: upstream refreshes can replace them. Commit
the copies, lockfile, and license notices together. Run `npm run check` and
reinstall the changed package after reviewing the diff.

Rex is a generated stub rather than a Git-managed skill. Refresh it using
`rex skill setup` with the desired Rex version, copy the generated instructions
into `third_party/rex/skills/rex/`, and review the diff. If you use the plugin,
remove any standalone copy created by that command to avoid duplicate discovery.

Provider MCP packages contain endpoint configuration and setup documentation only.
Verify URLs and authentication against the provider's official docs. Keep account
credentials out of the package, and make region-specific endpoints separate
choices when they are not interchangeable. The validator requires at least one
skill or MCP server, so an empty package fails validation.
