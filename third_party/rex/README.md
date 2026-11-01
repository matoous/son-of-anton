# Rex

A generated Rex skill stub and the official community MCP, in a portable plugin. The instruction body
is preserved from `rex skill setup`, stub version 2. It reads its guide from
`rex __internal skill`, so it matches the installed Rex CLI.

Install in Codex after registering the marketplace:

```sh
codex plugin add rex@son-of-anton
```

Start a new session and invoke `$rex:rex`. The Rex application and CLI must be
installed separately. For other assistants, see the
[installation guide](../../README.md#claude-code-cursor-copilot-gemini-and-other-assistants).
To refresh the generated stub, see [CONTRIBUTING.md](../../CONTRIBUTING.md).

## MCP connection

`mcp.json` declares `superlogical` at
`https://www.superlogical.com/rex/community-mcp`, using Streamable HTTP.
It searches Rex documentation, release notes, and current and past beta community
discussions. It requires Discord OAuth and membership in the Rex Beta Discord.
Codex handles sign-in and keeps credentials local.

Terminal operations still use the Rex CLI described by the skill. The package
does not add a third-party terminal-control bridge. See the
[official community MCP documentation](https://www.superlogical.com/rex/docs/beta/community-mcp).
