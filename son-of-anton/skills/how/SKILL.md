---
name: how
description: Explain how existing code or a subsystem works, tracing runtime flow, ownership, and boundaries from source evidence. Use for code walkthroughs and placement or layering questions; use why for historical rationale.
license: MIT
---

# How

Build a useful mental model from the implementation. Keep explanation requests
read-only unless the user also asks for changes.

1. Identify the behavior or subsystem and state a scope assumption if needed.
2. Start at the entry point and follow the path to the code that owns the
   behavior. Inspect relevant tests, configuration, dependencies, and callers.
3. Trace the important data and state changes. Identify ownership, boundaries,
   side effects, and failure paths that affect the user's question.
4. Explain the flow at the level needed to work on it. Use exact symbols and
   file links for key claims. Include a small diagram only if it clarifies more
   than prose would.

Answer the question first, then describe the key concepts, execution path, and
important caveats. Distinguish observed behavior from inference. Code can prove
what happens; it rarely proves the original author's intent.

Keep narrow questions in one agent. For a broad investigation, delegate
independent slices only when useful and reconcile their findings yourself.

Adapted from [pstack/how](https://github.com/cursor/plugins/blob/main/pstack/skills/how/SKILL.md).
See [LICENSE](LICENSE).
