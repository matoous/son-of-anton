---
name: swarm
description: Coordinate parallel Codex subagents and return one consolidated report. Use when the user asks to swarm a task or requests parallel coverage, exploration, or competing solutions.
license: MIT
---

# Swarm

Delegate the requested work to parallel subagents, collect their results, and
return one report. This skill requests delegation for the current task; workers
must stay within the user's scope and the session's permissions.

Adapted from [pstack's swarm skill](https://github.com/cursor/plugins/blob/main/pstack/skills/swarm/SKILL.md).
See [LICENSE](LICENSE) for the original MIT notice.

## Start

Track four phases: Frame, Fan out, Aggregate, Report. Use the session's plan tool
when available, otherwise keep a short checklist in the conversation.

Use the native Codex subagent tools exposed by the current session: `spawn_agent`
and the available messaging, waiting, interruption, and closing tools. Follow
their actual schemas; tool names and options can differ between clients. If
delegation is unavailable, report the limitation and continue useful work
directly, clearly identifying it as work without parallel agents.

## Phase A: Frame

1. Define completion and the artifact or report to return.
2. Choose the shape: divide coverage into independent slices, race workers on
   the same brief, or mix both. For a race, declare the selection rule before
   spawning: **first pass** (first verified result meeting the criteria),
   **rank all** (compare all results), or **best-of** (select the strongest result
   against stated criteria).
3. Choose a worker count that fits the task and available concurrency. Queue
   remaining slices in waves when capacity is limited. Inherit the session's
   model and reasoning settings unless the user or applicable instructions
   request overrides. For a requested model race, name each model up front and
   use only overrides supported by the current tool. Report an unavailable arm;
   do not silently substitute another model.
4. Assign each writer exclusive files or its own worktree and output path.
   Native subagents can share the same checkout; separate conversations do not
   isolate filesystem changes. Competing implementations need separate
   worktrees. Give concurrent builds separate output directories when needed.
5. For commit verification, pin the exact SHAs in each brief. For measurements,
   also specify the method, sample count, what a sample represents, and order.

## Phase B: Fan out

Spawn independent workers before waiting for results. Do not assume cloud
execution, automatic branch checkout, or filesystem isolation. When a worker
needs another revision, prepare an appropriate worktree and pass its absolute
path. Preserve unrelated local changes.

Make every brief self-contained: goal, scope, assigned slice or race arm,
working directory, write ownership or read-only instruction, verification,
and required evidence. Include relevant repository instructions and constraints.
Ask workers to complete their own assignment without further delegation unless
the plan explicitly allocates nested workers.

Require one status: `PASS`, `ISSUES`, or `BLOCKED`, with evidence, commands and
outcomes, file locations, changed paths when applicable, and any required SHAs
and measurement method. Workers report every defect they can prove in their
scope and distinguish untested hypotheses from confirmed issues.

Use the available wait or notification mechanism to collect terminal results.
Steer workers when needed without duplicating their work. Record dropouts and
continue with the remaining workers. A timeout or silence is not completion.

## Phase C: Aggregate

Check each result against its brief. If required revision or measurement
evidence is missing, request a correction or respawn that worker once; after
another miss, record a gap. Missing evidence never counts as a pass.

For coverage, account for every required slice. For races, apply the declared
rule. Under first pass, verify the candidate before stopping other arms; under
rank all or best-of, collect all arms or record why an arm could not finish.
Stop or drain remaining workers before finalizing so edits cannot continue
after the report. Close completed threads if the client supports it.

Deduplicate findings and reconcile contradictions against source evidence.
Inspect contributed changes and validate the combined result when workers
write code. Keep local checks, hosted CI, and live behavior distinct.

## Phase D: Report

Return one concise in-chat report: overall outcome, a table of slices or race
arms and their statuses and evidence, actionable issue summaries, and any gaps
or dropouts. Include the race rule and selected result when used. Summarize
worker results rather than pasting their raw output.
