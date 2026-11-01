# Engineering principles

These are the pstack principles condensed for this workflow. Apply judgment:
a principle should improve a decision, not create work unrelated to the task.

## Keep the solution small

- **Laziness protocol.** Centralize repeated decisions and choose the smallest
  coherent change that solves the problem.
- **Foundational thinking.** Identify the core data, invariants, and ownership
  before writing logic, including what concurrent actors share.
- **Redesign from first principles.** Consider how the requirement would fit
  from day one, then deliver the necessary change incrementally.
- **Attack the premise.** When successive fixes fail for the same reason,
  test their shared assumption before trying another patch.
- **Subtract before you add.** Simplify the relevant code before extending it
  when that reduces the work. Keep unrelated cleanup out of the change.
- **Minimize reader load.** Prefer explicit control flow, few layers, and local
  mutable state. An abstraction should remove more complexity than it adds.
  Use comments for constraints or reasoning the code cannot express.
- **Outcome-oriented execution.** Finish the requested transition. Keep
  intermediate compatibility only when callers or rollout constraints need it.
- **Experience first.** Judge product tradeoffs by what users need and notice.
- **Exhaust the design space.** For an uncertain, consequential design, compare
  distinct alternatives or cheap prototypes before committing to one.
- **Build the lever.** Use a script, generator, or repeatable check when it
  makes repetitive work cheaper or the result easier to verify.

## Make the model carry the rules

- **Model the domain.** Use types, state machines, tables, or collections that
  express the real rules. Avoid booleans that must stay synchronized.
- **Boundary discipline.** Validate external inputs and translate errors at
  system boundaries. Keep business rules independent of transport details.
- **Type system discipline.** Represent valid states directly and parse external
  data into them. Avoid casts that hide an incorrect model.
- **Make operations idempotent.** Design retryable work to converge safely,
  including failures between side effects.
- **Migrate callers then delete legacy APIs.** For an internal replacement,
  update callers and remove obsolete paths. Honor public compatibility promises.
- **Separate before serializing shared state.** Prefer independent ownership
  before adding locks or coordinating concurrent writers.

## Earn confidence

- **Prove it works.** Check the actual behavior or artifact the user needs.
  Compilation and a worker's summary prove only part of the result.
- **Fix root causes.** Trace a symptom to the first incorrect state or decision.
  Add a guard only when the state it handles is legitimate.
- **Sequence work into verifiable units.** End each meaningful unit with a
  check, so later work builds on known behavior.
- **Test behavior, not implementation.** Assert observable contracts. Keep tests
  useful when internal structure changes.
- **Explain the number.** Know what a measurement includes, what limits it,
  and whether noise or a changed workload explains the difference.

## Work deliberately

- **Guard the context window.** Read relevant sections, keep summaries concise,
  and delegate independent bulk investigation when useful.
- **Never block on the human.** Proceed with authorized reversible work and
  reasonable assumptions. Ask when a real blocker or new authorization remains.
- **Encode lessons in structure.** When a failure repeats, consider a targeted
  test, type, lint, or tool instead of another instruction. Change maintained
  rules or persisted memories only within the requested scope.
