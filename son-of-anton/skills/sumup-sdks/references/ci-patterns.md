# Recurring CI and generator patterns

Use these as diagnostic leads, not fixes to apply automatically. Confirm the actual target branch, dependency versions, and failed log first.

## OpenAPI schemas and public exports

Two common equivalent representations are a described reference and an annotation-only wrapper:

```json
{"$ref": "#/components/schemas/CountryCode", "description": "Address country."}
```

```json
{"allOf": [{"description": "Address country."}, {"$ref": "#/components/schemas/CountryCode"}]}
```

For a scalar `CountryCode`, these must not become an empty `AddressCountry` object or a missing generated type. Follow the parser's resolved proxy and reference name into type inference and dependency collection. Keep `Address` and its dependent public models exported from resource modules where supported.

Unwrap only wrappers that add annotations. Constraints such as `minLength`, multiple substantive branches, or object inheritance require their composition semantics. Keep object dependency edges used to collect inherited fields and exports. A named alias should retain its name where the SDK normally represents aliases. Recursive references require cycle-safe traversal.

Use one small fixture and direct assertions for the affected behavior. A harmless additional webhook in the real spec should not invalidate an exact fixture-sized event list: assert the known mappings remain present instead.

## Dependency upgrades

- **libopenapi/YAML:** some libopenapi upgrades move YAML node types from `go.yaml.in/yaml/v4` to `github.com/pb33f/go-yaml`. If compilation reports incompatible `yaml.Node` types, inspect the dependency's own imports and migrate the generator consumers consistently, including sample/doc helpers. Tidy the affected Go module. A matching type name from another import path is still a different Go type.
- **Go/linter versions:** check the updated dependency's minimum Go version, the module directive, the CI matrix, and the Go version used to build golangci-lint. Preserve supported coverage while correcting an impossible combination; do not silence lint or revert the intended dependency bump.
- **TypeScript test peers:** `@rstest/core` and `@rstest/browser` may require matching exact peer versions. Align the compatible pair and lockfile rather than using `--legacy-peer-deps` to hide the conflict.
- **TypeScript/TypeDoc:** TypeScript 7's native compiler may be incompatible with TypeDoc's JavaScript compiler API even if peer constraints are overridden. Verify docs actually generate. One working approach isolates the docs CLI with pinned compatible TypeDoc/TypeScript packages while keeping the SDK on the requested compiler. Check ESM/CJS declaration output paths too: shared output directories can cause one format's declarations to overwrite the other's.
- **NuGet PR titles:** a Dependabot title can fail Conventional Commit lint before tests start. Correct the affected title and, when in scope, configure that ecosystem's Dependabot `commit-message.prefix` so future updates follow the convention.

## Workflow and environment failures

- A `golangci-lint config verify` timeout downloading `golangci.v*.jsonschema.json` is a network failure before source lint. A rerun can resolve it; do not add empty commits or disable validation to make a transient failure green.
- A job labelled "Lint" may fail in `npm ci`, tests, or a generated-sample compile. Read the step and error, not just the job title.
- Generation workflows can check out the PR head directly while normal PR CI uses a synthetic merge commit. A spec-sync branch may therefore still lack a generator fix already on `main`. Refresh the branch and regenerate, preserving its intended spec changes. If the needed fix is in another open PR, carry it onto the sync branch only within the authorized repair scope and disclose the dependency.
- SDK generation may push a follow-up bot commit. Confirm the final remote head and checks; an earlier green SHA is not the final result.
- Inspect denied cache writes, missing JDK/.NET runtimes, browser dependencies, and registry access separately from source failures. Use temporary caches or isolated toolchain accommodations where useful; describe what was actually verified.
