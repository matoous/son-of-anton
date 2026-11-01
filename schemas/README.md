# Agent Plugins schemas

These are unmodified local copies of the published Agent Plugins 1.0.0 schemas:

- https://agent-plugins.org/schemas/1.0.0/plugin.schema.json
- https://agent-plugins.org/schemas/1.0.0/mcp.schema.json

`npm run check` uses Ajv's JSON Schema 2020-12 validator against these pinned files.
Validation does not download schemas. Plugin manifests keep the canonical public
`$schema` URLs so editors and other compatible clients can recognize the format.

Source: https://github.com/agentplugins/agent-plugins-spec/tree/main/schemas/1.0.0

The schema files are licensed under Apache-2.0; see `LICENSE` and the upstream
[licensing notice](https://github.com/agentplugins/agent-plugins-spec/blob/main/LICENSE.md).
