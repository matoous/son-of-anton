---
name: go
description: Write, review, refactor, test, and debug modern idiomatic Go in my preferred style.
---

# Go

Follow the repository first, preserve established architecture, naming, dependencies, and command surfaces unless the task explicitly changes them.

Do not trust model memory about recent Go availability. Read [references/modern-go.md](references/modern-go.md) up to date Go reference.

## Work from the Real Code Path

1. Trace behavior from its entry point to the layer that owns the change.
2. Search sibling implementations and reuse the repository's established seam.
3. Make the smallest coherent change that solves the requested behavior.
4. Preserve unrelated local edits; do not mix cleanup or modernization into a focused change.
5. Validate the exact package and failure surface before widening validation.

## Keep the Design Simple and Explicit

- Prefer direct control flow and inline operation-specific code over wrapper-only functions, pointer-to-slice state shuttling, or abstractions used once.
- Keep transport concerns at the boundary. Return domain or service errors from inner layers and translate them to HTTP, RPC, or CLI responses in handlers.
- Make constructor dependencies required when the component cannot operate without them. Avoid nil checks that silently turn required behavior into an optional feature.
- Prefer concrete types and define small interfaces at the consumer boundary only when substitution is needed.
- Make zero values useful where practical. Use constructors for invariants and required dependencies.
- Avoid pointers to slices, maps, channels, functions, and interfaces. Use pointers for mutation, optional values, or meaningfully large structs.
- Prefer the standard library and existing dependencies. Add a dependency only when its value clearly outweighs its maintenance cost.
- Keep packages cohesive and names short. Do not create vague `util`, `common`, or `helpers` packages.

## Handle Contexts and Lifecycle Ownership Deliberately

- Accept `context.Context` as the first parameter for request-scoped or blocking work. Do not store request contexts in structs.
- Treat construction contexts as initialization-only unless the API explicitly documents caller-owned runtime cancellation.
- Let a long-lived component own its goroutines and stop them through its `Close` or `Shutdown` method. Do not accidentally tie runtime lifetime to a caller's initialization context.
- Give every goroutine a clear owner, cancellation path, and completion strategy. Prefer synchronous APIs so callers choose whether to start background work.

## Wrap Errors in the Preferred Form

- Add lower-case, operation-oriented context and preserve the cause: `fmt.Errorf("get request: %w", err)` or `fmt.Errorf("save request data: %w", err)`.
- Avoid API-style labels, capitalization, punctuation, and vague text such as `operation failed` in wrapped internal errors.
- Reserve generic `error` results for unexpected failures when a function separately returns expected domain or protocol errors.
- Use typed errors only when callers need classification; inspect them with `errors.Is` or `errors.AsType`.
- Do not log and return the same error unless crossing a boundary where both actions are intentional.
- Never discard an error without a reason visible in code.

## Write Tests in the Preferred Shape

- Group tests by exported surface and use descriptive subtests for scenarios.
- Use `t.Parallel()` for isolated tests and subtests. Give each parallel case fresh fixtures, mocks, registries, databases, or state.
- Use `t.Context()` for unit-test calls that accept a context. Use a dedicated bounded context for cleanup code that must operate after the testing context is canceled.
- If used by the repository, prefer `stretchr/testify` assertions and requirements when already used. Prefer `require.NoError`, `require.ErrorIs`, `assert.Equal`, and related intent-revealing assertions over repeated manual conditionals. Prefer `assert.AnError` when mocking error results instead of `fmt.Errorf("boom")`.
- Prefer repository-generated gomock mocks over manual mock implementation when testing interface interactions. Use `gomock.InOrder` and `DoAndReturn` when later calls must reuse values produced by earlier calls.

- Do not mock code merely to avoid exercising a simple real helper. Test behavior owned by the package, not mechanics inherited from dependencies.
- Use table-driven tests only when cases genuinely share setup and assertions; do not force every test into a table.
- Keep tests deterministic. Avoid sleeps and arbitrary polling windows. Use stable `testing/synctest` in Go 1.25+ when virtual time and quiescence model the behavior.
- Use `t.Helper`, `t.Cleanup`, `t.TempDir`, and `t.Chdir` where they clarify ownership and cleanup.
- For topology, shutdown, and resilience behavior, add continuous-workload or real integration coverage when a one-shot fake-driven assertion cannot prove the contract.

## Respect Generated Sources and Migrations

- Do not edit generated Go files as the durable fix. Change the schema, model, template, or generator input, then regenerate.
- A local generated-file patch may prove a diagnosis, but do not leave it as the solution.
- Run generation before repairing downstream compile errors by hand.
- Track tool dependencies using the repository's existing convention, preferring Go 1.24 `tool` directives when supported.

## Keep Observability Canonical and Local

- Prefer generated OpenTelemetry semantic-convention helpers over raw attribute strings whenever coverage exists. Confirm the helper's exact type and availability at the current dependency version.
- Keep span attributes close to the operation site: simple, explicit, and inline. Add a helper only when several sites share a natural semantic operation.

## Validate Proportionally

Use repository-provided commands when available. Otherwise, progress from narrow to broad:

```sh
gofmt -w <changed-files>
go test ./path/to/changed/package
go test -race ./path/to/concurrent/package
go test ./...
go vet ./...
```
