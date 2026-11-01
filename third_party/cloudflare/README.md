# Cloudflare

Work with Cloudflare resources through its hosted API MCP server.

This package configures the provider's remote MCP server. It contains no
vendored skills or server implementation. It is maintained here; the hosted
server is operated by the provider.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add cloudflare@son-of-anton
```

Start a new session.
Complete Cloudflare OAuth and choose the account permissions to grant.

## Other MCP clients

Add a Streamable HTTP connection named `cloudflare` with this URL:

```text
https://mcp.cloudflare.com/mcp
```

Authentication is managed by your client. Credentials stay local; no tokens are
included here. If you already use a connection or provider plugin for this
service, choose one configuration to avoid duplicate tools.

See the [provider setup instructions](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/) for current requirements and tools.
