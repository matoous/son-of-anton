# Repository commands

These are starting points verified in the SDK workspace. Inspect the target branch's workflows, manifests, and `justfile`/`Makefile` before running them. Commands below run from that SDK's repository root unless a directory is explicitly changed. Run checks proportionate to the change; use CI to verify additional installed-toolchain matrices.

## Python: sumup-py

- Generator: `codegen/`, mainly `pkg/builder/`; generated models/exports: `sumup/types/__init__.py` and resource packages under `sumup/`.
- Generate: `(cd codegen && go run ./... generate --out ../sumup/ ../openapi.json)`.
- Generator checks: `go -C codegen test ./...`; sample tests also invoke Python.
- SDK: `uv sync --all-extras --dev`, then `uv run pytest`, `uv run ruff check`, `uv run ruff format --check`, and `uv run ty check` as relevant.
- Generation workflow also runs Ruff fixes/formatting; inspect generated exports as well as model types.
- Use the project's Python environment. A sandboxed Python bytecode cache can be redirected with `PYTHONPYCACHEPREFIX` to a temporary writable directory.

## PHP: sumup-php

- Generator: Go module `codegen/`, mainly `pkg/generator/`. SDK models: `src/Types/`; resource clients are under `src/<Resource>/`.
- Generate: `go -C codegen run . generate --out ../src ../openapi.json`; the current positional recipe also relies on the default `--out`, so prefer the explicit flag when choosing a destination.
- Generator checks: `go -C codegen test ./...`; its existing sample tests run `php -l` when PHP is installed.
- SDK: `composer install`, `composer test`, `composer analyse`, and `composer cs` as relevant. Follow `.github/workflows/ci.yaml` for the supported PHP matrix.
- Format generated PHP with `vendor/bin/php-cs-fixer fix --using-cache=no`. Use `--dry-run` for checks; `--sequential` avoids sandbox restrictions on the formatter's local parallel-process socket.
- `composer.lock` and `vendor/` are ignored in this library. Keep local dependency resolution artifacts out of the change.

## Go: sumup-go

- SDK: root Go module. Generator: separate module `internal/cmd/codegen/`, mainly `pkg/builder/`.
- Generate: `make generate` includes SDK generation and `DOCUMENTATION.md` via `gomarkdoc`.
- Generator-only invocation: `(cd internal/cmd/codegen && go run ./... generate --out ../../.. ../../../openapi.json)`.
- Check SDK with `go test ./...`; check generator separately with `go -C internal/cmd/codegen test ./...`. Use the repository lint/race/vet commands as relevant.
- Read both `go.mod` files. The generator may require a newer Go version than the SDK. A dependency update can raise the SDK minimum and invalidate an old CI matrix entry.

## TypeScript: sumup-ts

- `codegen/` and `sdk/` have separate `package.json` and lockfiles. Install with `npm ci` in each package needed for the change.
- Codegen: in `codegen/`, `npm run build`, `npm test`, `npm run tsc`, and `npm run lint`.
- Generate SDK: build `codegen/`, then run `npm run generate` in `sdk/`.
- SDK: in `sdk/`, `npm run build`, `npm run tsc`, `npm test`, and `npm run lint` as relevant. Build can format sources through its prebuild script; inspect resulting changes.
- Packaging/compiler upgrades: inspect ESM and CommonJS declaration entrypoints and run the existing package checks; CI also exercises browser, Bun, and Deno consumers. `npm run test:browser` requires the browser dependencies from CI.
- Docs: `npm run docs` in `sdk/`; compiler and documentation tooling can require different compatible TypeScript versions.

## .NET: sumup-dotnet

- Generator: Go module `codegen/`, mainly `internal/generator/`. SDK: `src/SumUp/`; solution: `SumUp.sln`.
- Generate: `(cd codegen && go run ./... --spec ../openapi.json --output ../src/SumUp --namespace SumUp)`.
- Generator checks: `go -C codegen test ./...`; this suite also compiles generated C# samples.
- SDK: `dotnet restore SumUp.sln`, `dotnet build SumUp.sln --configuration Release`, `dotnet test SumUp.sln --configuration Release`, and `dotnet format SumUp.sln --verify-no-changes` as appropriate.
- Generation workflow runs `dotnet format SumUp.sln`; generation drift checks may therefore require that formatting step.
- Inspect target frameworks and available runtimes. A local runtime roll-forward workaround is an environment accommodation, not proof that a missing runtime matrix passed. Sandbox caches can use temporary `DOTNET_CLI_HOME` and `NUGET_PACKAGES`.

## Java: sumup-java

- Generator: Go module `codegen/`, mainly `internal/generator/`. SDK sources: `src/main/java/com/sumup/sdk/`; Gradle project name is `sumup-sdk`.
- Generate: `go -C codegen run . generate`; then `./gradlew spotlessApply` as in CI.
- Generator checks: `go -C codegen test ./...`.
- SDK: `./gradlew test`, `./gradlew build`; generated examples: `./gradlew :sumup-sdk:compileCodeSamples`.
- Inspect Gradle toolchains and `-PtestJavaVersion` support. If an exact JDK is absent, an isolated temporary Gradle init script can check compilation under an installed JDK; report the limitation and rely on CI for the actual supported JDK matrix. Do not commit a temporary toolchain substitution.

## Rust: sumup-rs

- Workspace: `codegen/`, `xtask/`, and `sdk/`. Generated sources include `sdk/src/resources/`, `events.rs`, and `client.rs`.
- Generate: `cargo xtask generate`; generated examples: `cargo xtask validate-code-samples`.
- Checks: `cargo test --workspace --locked`, `cargo fmt --all -- --check`, and the CI Clippy command as relevant.
- `chrono` and `jiff` are mutually exclusive. Test separately: defaults/`--features chrono`, and `--no-default-features --features jiff`. Apply each configuration to tests/checks/Clippy as needed; avoid `--all-features` even if an older AGENTS example suggests it.
- `cargo xtask` is an alias that passes arguments to the task binary. For offline execution use `CARGO_NET_OFFLINE=true cargo xtask generate`, not `cargo xtask generate --offline`.
- SDK and sample compilation are distinct: `validate-code-samples` compiles emitted examples against the generated local SDK and can reveal missing public types that generation alone misses.
