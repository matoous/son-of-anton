# Honeycomb (EU)

Query telemetry and investigate production behavior in Honeycomb EU.

Includes 11 official skills from [honeycombio/agent-skill](https://github.com/honeycombio/agent-skill)
at revision `6bb09279fc3fb69abf113228be939dbb929e34f1`, plus the provider's remote
MCP connection. Skills cover queries, metrics, production investigations, SLOs,
boards, OpenTelemetry instrumentation and migration, GenAI instrumentation,
Beeline migration, and trace verification.

Skill bodies and supporting files are unmodified upstream snapshots. The CLI-owned
`skills-lock.json` records their sources, pinned revision, and hashes. The
`.agents/skills -> ../skills` alias keeps updates in the portable `skills/`
directory. The upstream MIT license is included in `LICENSE`.

Upstream agents, hooks, and setup commands are not bundled. The portable plugin
manifest, EU connection, and this README are maintained here.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add honeycomb@son-of-anton
```

Start a new session.
Invoke a skill such as `$honeycomb:production-investigation` or
`$honeycomb:otel-instrumentation`.
Enable Honeycomb Intelligence for your team, then complete browser OAuth.

This package connects to Honeycomb's EU region.

## Other MCP clients

Add a Streamable HTTP connection named `honeycomb` with this URL:

```text
https://mcp.eu1.honeycomb.io/mcp
```

Authentication is managed by your client. Credentials stay local; no tokens are
included here. If you already use a connection or provider plugin for this
service, choose one configuration to avoid duplicate tools.

See the [provider setup instructions](https://docs.honeycomb.io/integrations/mcp/configuration-guide/) for current requirements and tools.

For snapshot updates, see [CONTRIBUTING.md](../../CONTRIBUTING.md#vendor-upstream-skills).
