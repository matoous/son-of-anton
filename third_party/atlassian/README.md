# Atlassian

Search and work with Jira, Confluence, and other connected Atlassian products.

This package configures the provider's remote MCP server. It contains no
vendored skills or server implementation. It is maintained here; the hosted
server is operated by the provider.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add atlassian@son-of-anton
```

Start a new session.
Complete Atlassian OAuth; your existing product permissions and organization settings apply.

## Other MCP clients

Add a Streamable HTTP connection named `atlassian` with this URL:

```text
https://mcp.atlassian.com/v2/mcp
```

Authentication is managed by your client. Credentials stay local; no tokens are
included here. If you already use a connection or provider plugin for this
service, choose one configuration to avoid duplicate tools.

See the [provider setup instructions](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) for current requirements and tools.
