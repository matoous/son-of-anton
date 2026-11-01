---
name: technical-writing
description: Write or review technical documentation, RFCs, READMEs, PR descriptions, and commit messages for a specific audience and task. Use for technical writing work; use unslop for a wording-only cleanup.
license: MIT
---

# Technical writing

Start with the reader, their task, and what they need to know or do. Follow the
repository's format and use its actual names for commands, symbols, and files.

## Choose the structure

- A tutorial guides learning through a working example with visible results.
- A how-to gives a competent reader the steps to complete a specific task.
- Reference documents exact options, contracts, defaults, limits, and errors.
- An explanation develops a mental model, including reasons and tradeoffs.

Give each page or section a clear purpose. Separate background from procedural
steps when mixing them would slow the reader down. For an RFC, make the problem,
proposal, alternatives, and open decisions easy to find.

## Write and verify

- Lead with the behavior or outcome, then the details needed to use or assess it.
- Use active voice and direct instructions. Put a prerequisite or condition
  before the step it controls. Keep terminology consistent and pronouns clear.
- Use numbered steps for procedures and show expected results where useful.
- Check commands, examples, defaults, and links against their source. Label
  assumptions and experimental behavior. Edit generated documentation at its
  authoritative source.
- For PRs and commits, explain the problem and resulting behavior, then relevant
  validation and limitations. Respect the repository template.
- Remove filler and artificial phrasing while retaining necessary detail.

Keep public docs about integrator behavior. Include implementation details only
when they help the intended reader make a decision.

Adapted from [pstack/technical-writing](https://github.com/cursor/plugins/blob/main/pstack/skills/technical-writing/SKILL.md).
See [LICENSE](LICENSE).
