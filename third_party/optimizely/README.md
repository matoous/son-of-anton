# Optimizely Experimentation

Use Optimizely's hosted Experimentation MCP server to query projects, feature
flags, experiments, audiences, and results, or make changes supported by its tools.
Your existing Optimizely permissions apply.

This package maintains the connection configuration. It contains no vendored
skills or server implementation; Optimizely operates the remote server.
It connects to the Experimentation service described in the
[launch article](https://www.optimizely.com/field-notes/articles/experimentation-mcp-server).
Optimizely Analytics and CMS use separate integrations.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add optimizely@son-of-anton
```

Start a new session and ask: “List my Optimizely projects.” When prompted,
connect to your Optimizely Agent Platform instance and complete browser OAuth.
You need an Opti ID account and Agent Platform enabled and connected to at least
one Web Experimentation or Feature Experimentation instance.

No API key, bearer-token variable, or custom authorization header is needed.
Credentials remain local and are managed by your client. Available projects and
actions depend on your Optimizely permissions.

If tools are missing, check authentication and project access. If the connection
fails behind a proxy or VPN, confirm that `exp.mcp.opal.optimizely.com` is reachable.

## Other MCP clients

Add a Streamable HTTP connection named `optimizely` with this URL:

```text
https://exp.mcp.opal.optimizely.com/mcp
```

Complete OAuth through your client. The skills CLI does not install MCP-only
packages, so use your assistant's MCP settings instead. If you already have an
Optimizely connection, choose one configuration to avoid duplicate tools.

See the [official installation guide](https://docs.optimizely.com/experimentation-strategy/docs/install-optimizely-experimentation-mcp-server)
for current requirements, client-specific instructions, and troubleshooting.
