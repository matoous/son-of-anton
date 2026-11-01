# Lightdash

The four user-facing skills documented in the
[Lightdash installation guide](https://docs.lightdash.com/workflow/install-agent-skills),
vendored from [lightdash/lightdash](https://github.com/lightdash/lightdash/tree/main/skills).
The supporting references are included; the portable plugin wrapper is maintained here.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add lightdash@son-of-anton
```

Start a new session and use a skill directly, or describe the task:

| Skill | Use it for |
| --- | --- |
| `$lightdash:developing-in-lightdash` | Semantic-layer YAML, metrics, dimensions, joins, and content as code. |
| `$lightdash:effective-dbt-sql` | Reusing fields and writing dbt SQL with explicit joins and clear query structure. |
| `$lightdash:lightdash-release-review` | Reviewing shipped features and changes over a date range. |
| `$lightdash:upgrade-preflight` | Checking self-hosted upgrade spans and interpreting migration preflight results. |

CLI workflows need the [Lightdash CLI](https://docs.lightdash.com/workflow/cli/reference).
Commands that access a project need its usual authentication and permissions.
Release reviews use public GitHub data without Lightdash credentials. Migration
preflight runs inside the self-hosted image with its database environment.
These instructions do not install the CLI or configure an MCP connection.

For other assistants, use the [main README's skills CLI commands](../../README.md#claude-code-cursor-copilot-gemini-and-other-assistants).
Avoid installing duplicate copies through both a plugin and `lightdash install-skills`.

## Update the snapshot

From this directory:

```sh
npx --yes skills@1.7.4 add https://github.com/lightdash/lightdash/tree/main/skills \
  --skill developing-in-lightdash effective-dbt-sql lightdash-release-review upgrade-preflight \
  --agent codex --copy --yes
```

The alias `.agents/skills -> ../skills` keeps native CLI updates writing to the
portable `skills/` directory. Review the diff, retain `LICENSE`, run `npm run check`
from the repository root, and reinstall the plugin. Check compatibility with your
CLI and server versions when adopting a newer snapshot.

### Upstream metadata correction

`skills-lock.json` tracks the three skills accepted by the native installer.
At snapshot [3dfeeff114e2149b833f32f310c27138b762be33](https://github.com/lightdash/lightdash/tree/3dfeeff114e2149b833f32f310c27138b762be33/skills),
the unquoted `description` in `effective-dbt-sql/SKILL.md` contains a colon followed
by a space, making its YAML invalid. The installer skips it, so that skill was
copied from this commit and its description quoted locally. Its body and both
supporting references are unchanged. It is not yet tracked in the CLI lockfile;
refresh it explicitly with the command above once upstream metadata is fixed.

The other three skills retain upstream content. The native installer copies the
three JSON schema symlink targets as regular files, so the package works without
the rest of the Lightdash monorepo. The upstream MIT license and copyright notice
are retained in `LICENSE`.
