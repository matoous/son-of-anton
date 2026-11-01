---
name: why
description: Investigate why existing code or a design decision took its current shape using history, discussion, and documentation. Use for rationale and tradeoff questions; use how for runtime behavior.
license: MIT
---

# Why

Recover the reasons behind a decision. A plausible explanation from today's
code is an inference, not evidence of the author's intent.

1. Anchor the question to concrete files, symbols, or behavior. Read enough
   current code to identify the decision being investigated.
2. Inspect relevant history with `git log`, `git blame`, and `git show`.
   Follow renames or earlier changes when the latest commit only moved code.
3. Follow references to PR discussions, issues, design documents, or incidents.
   Use available connected sources where they are relevant; widen the search
   when the local evidence leaves a meaningful gap. Do not require every source
   category for a question one recorded decision can answer.
4. Compare the evidence with current behavior. Separate documented motivation,
   reasonable inference, conflicting accounts, and what remains unknown.

Return the best-supported answer with links or commit and file references.
Say which important evidence was unavailable. If the question precedes a
change, identify the constraints the change needs to preserve.

Keep the investigation read-only. Do not contact authors or edit external
records without the user's authorization.

Adapted from [pstack/why](https://github.com/cursor/plugins/blob/main/pstack/skills/why/SKILL.md).
See [LICENSE](LICENSE).
