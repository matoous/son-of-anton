# Notion

Search, read, and update Notion workspace content through its hosted MCP server.

This package configures the provider's remote MCP server. It contains no
vendored skills or server implementation. It is maintained here; the hosted
server is operated by the provider.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add notion@son-of-anton
```

Start a new session.
Complete Notion OAuth and select the workspace you want to connect.

## Other MCP clients

Add a Streamable HTTP connection named `notion` with this URL:

```text
https://mcp.notion.com/mcp
```

Authentication is managed by your client. Credentials stay local; no tokens are
included here. If you already use a connection or provider plugin for this
service, choose one configuration to avoid duplicate tools.

See the [provider setup instructions](https://developers.notion.com/guides/mcp/get-started-with-mcp) for current requirements and tools.
