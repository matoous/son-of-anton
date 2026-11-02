# Honeycomb (EU)

Query telemetry and investigate production behavior in Honeycomb EU.

This package configures the provider's remote MCP server. It contains no
vendored skills or server implementation. It is maintained here; the hosted
server is operated by the provider.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add honeycomb@son-of-anton
```

Start a new session.
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
