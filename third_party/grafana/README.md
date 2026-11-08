# Grafana skills

Includes 53 official skills from [grafana/skills](https://github.com/grafana/skills)
at revision `8fb72a527961f05e708f53d2a0500709e12d7970`. Covers Grafana dashboards,
PromQL, Grafana Cloud, Loki, Tempo, Mimir, Prometheus, Pyroscope, k6, plugin
development, the App SDK, and data source provisioning.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add grafana@son-of-anton
```

Start a new session. Invoke `$grafana:dashboarding`, `$grafana:promql`, or
`$grafana:k6`, for example.

This is a skills-only package. Live queries require your Grafana instance's
connection and credentials. Follow the [official Grafana MCP setup guide](https://github.com/grafana/mcp-grafana#usage)
or use `$grafana:assistant-mcp` for setup guidance. Keep credentials in your
client configuration, outside this repository. Individual workflows may also
require tools such as `gcx`, `profilecli`, or k6; see each skill's prerequisites.

## Vendoring

The upstream plugin groups are flattened into one portable `skills/` directory.
The CLI-owned `skills-lock.json` records sources, pinned revision, and upstream
hashes; `.agents/skills -> ../skills` keeps updates in that directory. The upstream
starter template is excluded. All skill files and supporting resources are copied,
with three relative links adjusted for the flattened layout:

- `datasources-provisioning/SKILL.md` links to `grafana-oss`.
- `synthetic-monitoring-checks/SKILL.md` links to `k6`.
- `grafana-oss/references/config.md` links to `admin/references/sso.md`.

The Apache 2.0 license is included in `LICENSE`. The portable manifest and this
README are maintained here. For updates, see
[CONTRIBUTING.md](../../CONTRIBUTING.md#vendor-upstream-skills). Select skills
explicitly when refreshing to avoid installing the upstream starter template,
then reapply the three link adjustments above.
