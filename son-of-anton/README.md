# Son of Anton

The personal engineering workflow plugin in this marketplace.

## Skills

| Skill | Use it for |
| --- | --- |
| [`$son-of-anton:anton`](skills/anton/SKILL.md) | Candid engineering, core principles, and relevant companions for a task. |
| [`$son-of-anton:how`](skills/how/SKILL.md) | Runtime flow, ownership, and code walkthroughs. |
| [`$son-of-anton:why`](skills/why/SKILL.md) | Design rationale supported by history and discussion. |
| [`$son-of-anton:architect`](skills/architect/SKILL.md) | Types, interfaces, and ownership before implementation. |
| [`$son-of-anton:tdd`](skills/tdd/SKILL.md) | A focused regression check that fails before a fix and passes after it. |
| [`$son-of-anton:unslop`](skills/unslop/SKILL.md) | Natural, direct prose with the meaning preserved. |
| [`$son-of-anton:technical-writing`](skills/technical-writing/SKILL.md) | Docs, RFCs, PR descriptions, and commit messages. |
| [`$son-of-anton:swarm`](skills/swarm/SKILL.md) | Parallel coverage or competing solutions, combined into one report. |
| [`$son-of-anton:go`](skills/go/SKILL.md) | Modern Go in my preferred style. |
| [`$son-of-anton:sumup-sdks`](skills/sumup-sdks/SKILL.md) | Maintain SumUp SDKs, generators, and their PRs. |

Start with `$son-of-anton:anton` followed by the task, or invoke a companion directly.
The workflow skills use the available Codex tools and the session's model settings.

## Adjust the workflow

Edit a skill's `SKILL.md` to change its behavior. The shared principles live in
[principles.md](skills/anton/references/principles.md); the routing table in
[anton](skills/anton/SKILL.md) chooses which companions to read.
Add new skills as sibling directories under `skills/`.

The workflow skills are lightweight adaptations of
[pstack](https://github.com/cursor/plugins/tree/main/pstack). Their source links
and MIT license notices are retained in the individual skill directories.

## Customize

Edit `skills/<name>/SKILL.md` to adjust the instructions. For local installation,
validation, or adding skills, see [the contributor guide](../CONTRIBUTING.md).
