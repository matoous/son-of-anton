---
name: architect
description: Sketch data models, interfaces, and ownership before a consequential design change. Use when asked to architect or design a feature, or when implementation would otherwise commit to an uncertain structure.
license: MIT
---

# Architect

Choose a structure that fits the problem and the surrounding code. Scale the
sketch to the decision; a few signatures can be enough.

1. Ground the design in requirements, callers, existing boundaries, and tests.
   Recover historical constraints when they matter. Identify what must remain
   compatible and how the result will be verified.
2. Write a caller's usage example first. Derive the types, state transitions,
   signatures, ownership, and error behavior needed to support it.
3. For an uncertain or costly choice, compare at least two distinct designs.
   Use a small prototype when observation can settle the question. Prefer the
   design with clear invariants and less complexity for callers and maintainers.
4. Explain the choice and its material tradeoff. If implementation is requested,
   continue with the chosen design. If the task asks only for a design or a
   checkpoint, return the sketch and stop there.
5. During implementation, revise the sketch when new evidence invalidates it.
   Repeated casts, synchronized flags, or callers depending on hidden rules
   suggest a model problem. Fix that problem before adding more exceptions.

Keep sketches in the conversation or a scratch artifact unless a maintained
design document is part of the task. Do not leave placeholder code in the
finished implementation. Parallel design exploration is optional.

Adapted from [pstack/architect](https://github.com/cursor/plugins/blob/main/pstack/skills/architect/SKILL.md).
See [LICENSE](LICENSE).
