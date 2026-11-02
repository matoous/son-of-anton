# Miro

Official skills from [miroapp/miro-ai](https://github.com/miroapp/miro-ai/tree/main/skills),
bundled with Miro's hosted MCP server. The skill files and references are upstream
snapshots; `skills-lock.json` records their sources and hashes. The portable plugin
wrapper is maintained here, and the upstream MIT license is included in `LICENSE`.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add miro@son-of-anton
```

Start a new session and connect to Miro when prompted. Complete browser OAuth
and select the team containing your target boards. Enterprise policies can
restrict access; if authorization is blocked, check with your Miro administrator.
For a board access error, check board permissions and that you selected the right team.
See the [official connection guide](https://developers.miro.com/docs/connecting-to-miro-mcp).

| Skill | Use it for |
| --- | --- |
| `$miro:miro-code-spec` | Extract board or item specifications into local `.miro/specs/` files. |
| `$miro:miro-code-review` | Create a visual code review on a board from a PR, branch comparison, or local changes. |
| `$miro:miro-code-explain-on-board` | Explain a codebase with architecture diagrams and companion documentation. |

Provide a full Miro board or item URL with the task. Board creation and editing
use the MCP tools; these actions require the corresponding Miro permissions.

## Other assistants

Install the skills using the [main README's skills CLI commands](../../README.md#claude-code-cursor-copilot-gemini-and-other-assistants).
Add a remote Streamable HTTP MCP connection named `miro` with this URL:

```text
https://mcp.miro.com/
```

The plugin includes this connection and the upstream Codex client's
`X-AI-Source: codex-plugin` header. Other clients should use their provider setup
instructions. Authentication stays local; this package contains no credentials.
Choose this package or an existing Miro plugin/connection to avoid duplicate tools.

## Update the snapshot

From this directory:

```sh
npx --yes skills@1.7.4 add https://github.com/miroapp/miro-ai/tree/main/skills \
  --skill miro-code-explain-on-board miro-code-review miro-code-spec \
  --agent codex --copy --yes
```

The alias `.agents/skills -> ../skills` keeps native CLI updates writing to the
portable `skills/` directory. Review the diff, retain upstream license notices,
run `npm run check` from the repository root, and reinstall the plugin.
