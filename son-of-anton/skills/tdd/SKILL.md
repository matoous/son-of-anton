---
name: tdd
description: Fix a bug with a focused failing-before and passing-after regression check. Use when the user requests TDD or a regression test, or when a bug has a clear, cheap local test path.
license: MIT
---

# TDD

Make the broken behavior executable before changing production code when a
practical check exists.

1. Identify the intended behavior, actual behavior, and smallest reproduction.
2. Use the nearest existing test setup. Add a focused assertion against the
   observable contract, with deterministic inputs and minimal fixtures.
3. Run it before the fix. Confirm it fails because of the reported bug, rather
   than missing dependencies, setup errors, or an unrelated failure.
4. Fix the cause with the smallest coherent production change.
5. Rerun the check, then the relevant nearby tests. Refactor only as needed and
   keep the checks passing.

If a test needs extensive new infrastructure or mostly asserts mock behavior,
use the closest practical reproduction instead. Explain the limitation. If the
user explicitly requests a test, make clear whether that deliverable was met.
Do not weaken assertions to accommodate a wrong implementation.

Report the failing-before and passing-after evidence. If the code was already
fixed or the original failure could not be reproduced, say so; a passing test
alone does not establish that it would have caught the bug.

Adapted from [pstack/tdd](https://github.com/cursor/plugins/blob/main/pstack/skills/tdd/SKILL.md).
See [LICENSE](LICENSE).
