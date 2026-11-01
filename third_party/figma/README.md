# Figma

Use Figma design context and supported design tools through its hosted MCP server.

This package configures the provider's remote MCP server. It contains no
vendored skills or server implementation. It is maintained here; the hosted
server is operated by the provider.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add figma@son-of-anton
```

Start a new session.
Sign in with Figma when prompted. Available tools depend on your client and Figma access.

## Other MCP clients

Add a Streamable HTTP connection named `figma` with this URL:

```text
https://mcp.figma.com/mcp
```

Authentication is managed by your client. Credentials stay local; no tokens are
included here. If you already use a connection or provider plugin for this
service, choose one configuration to avoid duplicate tools.

See the [provider setup instructions](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) for current requirements and tools.
