# incident.io

Copied from [incident-io/skills](https://github.com/incident-io/skills) using
`npx skills`. Skill bodies and supporting files are upstream snapshots;
`skills-lock.json` records their sources and hashes. The portable wrapper uses
root `plugin.json` and discovers the standard `skills/` directory.

The alias `.agents/skills -> ../skills` keeps `npx skills` updates writing to the
same files without maintaining duplicate copies. It stays inside this package.

## MCP connection

`mcp.json` bundles the official remote server at `https://mcp.incident.io/mcp`,
named `incident_io`, using Streamable HTTP. Enable remote MCP in incident.io
**Settings → MCP**, then complete browser OAuth when Codex prompts on first use.
Credentials remain local; the package contains no tokens or authorization headers.
See the [upstream setup instructions](https://docs.incident.io/ai/remote-mcp#codex).

If you already use the official incident.io plugin, choose either it or this
vendored package to avoid loading duplicate skills and connections. The macOS
app also provides its own local connection, managed by the app.

Install in Codex after registering the marketplace:

```sh
codex plugin add incident-io@son-of-anton
```

Start a new session and invoke `$incident-io:incidents` or another skill. For
other assistants, see the [installation guide](../../README.md#claude-code-cursor-copilot-gemini-and-other-assistants).
For updating the upstream snapshots, see [CONTRIBUTING.md](../../CONTRIBUTING.md).

The upstream MIT license is included in `LICENSE`. The portable manifests and
this README are maintained here around the unmodified upstream skill copies.
