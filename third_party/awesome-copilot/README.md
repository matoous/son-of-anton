# Awesome Copilot

Selected upstream skills from
[github/awesome-copilot](https://github.com/github/awesome-copilot):

- [`conventional-commit`](https://github.com/github/awesome-copilot/tree/main/skills/conventional-commit): review changes and create conventional commits.
- [`agent-owasp-compliance`](https://github.com/github/awesome-copilot/tree/main/skills/agent-owasp-compliance): review AI agent code against OWASP agent security risks.

The skill files are unmodified; `skills-lock.json` records the source path and
snapshot hash. The MIT license is included in `LICENSE`. The portable plugin
wrapper is maintained here.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add awesome-copilot@son-of-anton
```

Start a new session and use `$awesome-copilot:conventional-commit` to review
changes and create a conventional commit. The upstream workflow stages changes
and runs `git commit`.

Use `$awesome-copilot:agent-owasp-compliance` to review an AI agent codebase's
security controls. This package does not configure an MCP server.

For a standalone install in another assistant, see the [main README](../../README.md).

## Update the snapshot

From this directory:

```sh
npx --yes skills@1.7.4 add github/awesome-copilot --skill conventional-commit --agent codex --copy --yes
npx --yes skills@1.7.4 add github/awesome-copilot --skill agent-owasp-compliance --agent codex --copy --yes
npx skills@1.7.4 update --project --yes
```

The alias `.agents/skills -> ../skills` keeps native CLI updates writing to the
portable `skills/` directory. Review the diff, retain upstream license notices,
and run `npm run check` from the repository root before reinstalling the package.
