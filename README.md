# Son of Anton

Small, adaptable skills for AI-assisted engineering. Start with **Anton** for
candid feedback, simple designs, evidence, and focused verification, or use a
specific skill for architecture, testing, writing, or understanding code.

## What is included

| Package | What you get |
| --- | --- |
| [Son of Anton](son-of-anton/) | Anton, How, Why, Architect, TDD, Unslop, Technical Writing, Swarm, Go, and SumUp SDKs. |
| [Rex](third_party/rex/) | Rex terminal workflows plus an MCP connection for documentation and community discussions. Requires the Rex app and CLI. |
| [incident.io](third_party/incidentio/) | Vendored incident.io skills plus its official remote MCP server. Requires an incident.io account. |

## Install in Codex

Register the marketplace and install the personal workflows:

```sh
codex plugin marketplace add matoous/son-of-anton
codex plugin add son-of-anton@son-of-anton
```

Install either companion when needed:

```sh
codex plugin add rex@son-of-anton
codex plugin add incident-io@son-of-anton
```

Start a new Codex session. For example:

```text
$son-of-anton:anton Fix this bug with a simple solution and focused verification.
$son-of-anton:how Explain how requests reach this handler.
$son-of-anton:swarm Review this change from several independent perspectives.
$rex:rex Show my terminal sessions.
```

The incident.io package uses names such as `$incident-io:incidents` and
`$incident-io:on-call`. If you already use its official plugin, choose one of
the two packages so the same skills and MCP connection are not loaded twice.

Update the installed plugins, then start a new session:

```sh
codex plugin marketplace upgrade son-of-anton
```

To uninstall a package, use its full name:

```sh
codex plugin remove son-of-anton@son-of-anton
```

## Claude Code, Cursor, Copilot, Gemini, and other assistants

Install the instructions with the [skills CLI](https://github.com/vercel-labs/skills).
Requires Node.js 22.20+ and Git:

```sh
npx skills add matoous/son-of-anton --full-depth --global
```

Select the skills you want. To target an assistant explicitly, add its flag:

| Assistant | Flag |
| --- | --- |
| Claude Code | `--agent claude-code` |
| Cursor | `--agent cursor` |
| GitHub Copilot | `--agent github-copilot` |
| Gemini CLI | `--agent gemini-cli` |
| OpenCode | `--agent opencode` |
| Codex without plugins | `--agent codex` |

For example, install only Anton for Claude Code:

```sh
npx skills add matoous/son-of-anton --full-depth \
  --global --agent claude-code --skill anton
```

Omit `--global` to install into the current project. Standalone skills use names
such as `anton` and `how`, without the plugin prefix. Ask your assistant to use
the skill, for example: “Use Anton to review this design.”

The engineering and writing guidance works across assistants. Swarm is written
for Codex's subagent tools; other assistants may need adaptations for parallel
work. The skills CLI installs instructions only, so configure MCP connections
separately when using Rex or incident.io. Use one installation method per skill
in a given assistant to avoid duplicates.

List or update skills installed by the skills CLI:

```sh
npx skills list --global
npx skills update --global
```

## MCP connections

Codex plugin installations include these connections. For a standalone skills
installation, add the corresponding URL in your assistant's MCP settings:

| Server | URL | Access |
| --- | --- | --- |
| `superlogical` | `https://www.superlogical.com/rex/community-mcp` | Rex Beta Discord membership and Discord OAuth. |
| `incident_io` | `https://mcp.incident.io/mcp` | Enable remote MCP in incident.io Settings, then approve OAuth. |

Rex's MCP searches documentation, release notes, and beta discussions. Terminal
operations use the installed Rex CLI. Incident.io's MCP provides incident,
on-call, and operational tools. Your assistant handles browser sign-in and stores
credentials locally; no tokens belong in this repository.

See the [Rex setup](https://www.superlogical.com/rex/docs/beta/community-mcp) and
[incident.io setup](https://docs.incident.io/ai/remote-mcp) for account requirements.

## Customize or contribute

Skill instructions are plain Markdown. Fork the repository and adjust them to
your workflow. See [CONTRIBUTING.md](CONTRIBUTING.md) for local installation,
validation, and vendoring commands.
