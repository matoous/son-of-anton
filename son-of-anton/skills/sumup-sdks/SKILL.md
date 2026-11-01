---
name: sumup-sdks
description: Maintain SumUp's Python, PHP, Go, TypeScript, .NET, Java, and Rust SDK repositories, including OpenAPI generators, public exports, dependency upgrades, and failing PRs or CI. Use for work on these SDKs individually or across languages; consumer checkout integration work belongs to the integration skills.
---

# SumUp SDKs

## Find the requested repositories

"All our SDKs" means these seven repositories unless the user specifies another scope:

| Language | GitHub repository | Generator | SDK sources |
| --- | --- | --- | --- |
| Python | `sumup/sumup-py` | Go module `codegen/` | `sumup/` |
| PHP | `sumup/sumup-php` | Go module `codegen/` | `src/` |
| Go | `sumup/sumup-go` | Separate Go module `internal/cmd/codegen/` | Repository root |
| TypeScript | `sumup/sumup-ts` | npm package `codegen/` | npm package `sdk/` |
| .NET | `sumup/sumup-dotnet` | Go module `codegen/` | `src/SumUp/` |
| Java | `sumup/sumup-java` | Go module `codegen/` | `src/main/java/com/sumup/sdk/` |
| Rust | `sumup/sumup-rs` | Workspace crates `codegen/` and `xtask/` | `sdk/` |

They are normally siblings under `~/code/github.com/sumup/`. Discover siblings from the current checkout first; use that root as a fallback. For an explicitly named subset, work only on that subset.

Read the relevant checkout's `AGENTS.md`, manifests, and CI workflows. Check the current branch and working tree before edits. Use isolated temporary clones or worktrees for multiple PR branches; preserve the user's existing checkouts. If fsmonitor produces IPC errors, use `git -c core.fsmonitor=false ...`.

Read [repository commands](references/repositories.md) for the selected SDKs. Recheck commands and toolchain versions against the target branch; sibling repositories and PRs can intentionally use different versions.

## Cross-SDK implementation

- Trace the behavior through each generator and its generated output. Share the desired behavior across languages, while retaining each SDK's established patterns.
- Fix generated defects in the generator or authoritative spec, then regenerate. Check public exports, dependency collection, aliases, and inherited fields as well as generated field types.
- `sumup/apis` owns the public spec sources. Its `make generate-specs` produces `specs/openapi31.json`; `.github/sync.yaml` distributes that to SDK `openapi.json` files. Verify this ownership before changing specs. Preserve valid metadata when the generator is the problem.
- Each SDK's checked-in spec is its own input. Do not copy a newer spec across all SDKs merely to exercise a generator fix. A small fixture can reproduce equivalent schema shapes without adding an unrelated API sync.
- Described `$ref` values and annotation-only `allOf` wrappers must retain the underlying scalar, array, or referenced type. Preserve real composition constraints, named references, object inheritance, recursive traversal, and dependency edges used for exports. Read [CI and codegen patterns](references/ci-patterns.md) when diagnosing these cases.
- Keep regression tests simple: a small representative fixture and a few direct assertions. Prefer basic generated-output assertions over AST traversal, compiler subprocesses, exhaustive edge-case matrices, or elaborate test helpers unless the actual failure requires them. Do not add tests merely to mirror implementation details.
- Go-based generators have independent modules: root SDK tests do not cover them. Apply the available Go style skills when editing Go.

When parallel work is authorized and useful, give workers disjoint repositories or branches and isolated checkouts. Have each report its diagnosis, changed paths, old/new commit IDs, and final CI status; independently check the overall result.

## Review and repair PRs

List current open PRs and inspect their check rollups for every selected repository. Include Dependabot and API sync branches in a request to review all SDK PRs. Inspect the exact failing job and step before editing; a check named "Lint" can include tests or dependency installation. Distinguish failed, pending, skipped, and absent checks.

Use `gh pr list`, `gh pr view`, `gh pr checks`, and `gh run view --log-failed`, or equivalent GitHub tools. Capture the current remote head OID before changing a branch. Diagnose dependency/toolchain compatibility instead of undoing the requested upgrade or suppressing failures.

If the failure is a transient download timeout, rerun the failed job without making an empty code change. If the same failure repeats, investigate it rather than retrying indefinitely. For source fixes, run the affected generator and SDK checks, regenerate where appropriate, and inspect the diff for unintended churn. For generated-source checks that use the PR head directly, bring needed base fixes onto the PR branch within the authorized repair scope; do not merge another PR as a shortcut.

Verify the new PR head and fresh CI after publishing. Fix subsequent failures exposed by the update. Report remaining blockers or checks still pending accurately. See [recurring CI patterns](references/ci-patterns.md) for specific diagnostics.

## Git and reporting preferences

- Follow the publication scope authorized for the task. This skill supplies no standing permission to push, rewrite branches, merge PRs, or publish packages. Do not ask again for actions the user already authorized.
- For requested new SDK PRs, prefer `md/<topic>` branches, draft PRs, and assignment to `matoous`, unless the user specifies otherwise. Use one matching branch name across repositories when requested; choose the topic for the current task.
- Use concise Conventional Commits, such as `fix(codegen): preserve annotated schema types`. Keep commit bodies and PR descriptions short, plain English, and focused on the problem and resulting behavior. Put routine validation details in the work report unless requested in the PR itself.
- When the user requests amend and force-push, amend the intended commit and use an exact lease: `git push --force-with-lease=refs/heads/<branch>:<observed-remote-oid> origin HEAD:refs/heads/<branch>`. If the lease fails, inspect the new remote commits before proceeding; never replace the lease with an unchecked force push.
- Report links per repository, what was fixed, and observed checks. Mention intentional PR dependencies. Preserve unrelated tracked and untracked work, and keep temporary build/toolchain accommodations out of commits.
