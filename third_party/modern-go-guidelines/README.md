# Modern Go Guidelines

The upstream `use-modern-go` skill from
[JetBrains/go-modern-guidelines](https://github.com/JetBrains/go-modern-guidelines),
vendored with its shell and PowerShell wrappers. The skill files are unmodified;
`skills-lock.json` records the source path and snapshot hash. The Apache-2.0
license is included in `LICENSE`. The portable plugin wrapper is maintained here.

## Install

After registering the Son of Anton marketplace:

```sh
codex plugin add modern-go-guidelines@son-of-anton
```

Start a new session and use `$modern-go-guidelines:use-modern-go`, or ask your
assistant to apply modern Go guidelines. This package needs the Go toolchain on
PATH. On first use, its wrapper installs the versioned guidelines CLI into a
local cache with `go install`. Older Go installations need automatic toolchain
switching to obtain the supported Go version. It does not configure an MCP server.

If the JetBrains marketplace plugin is already installed, choose it or this
vendored copy to avoid loading the same skill twice. For a standalone install
in another assistant, see the [main README](../../README.md).

## Update the snapshot

From this directory:

```sh
npx --yes skills@1.7.4 add JetBrains/go-modern-guidelines --skill use-modern-go --agent codex --copy --yes
npx skills@1.7.4 update --project --yes
```

The alias `.agents/skills -> ../skills` keeps native CLI updates writing to the
portable `skills/` directory. Review the diff, retain upstream license notices,
and run `npm run check` from the repository root before reinstalling the package.
