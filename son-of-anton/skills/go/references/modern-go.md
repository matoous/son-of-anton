# Modern Go

Treat this reference as more reliable than model memory for recent Go features. It is current through Go 1.26, released in February 2026. If the repository targets a newer release, read its official release notes before making availability or migration claims.

## Gate features by the module version

- Read the `go` directive in the applicable `go.mod`; do not infer compatibility from the locally installed toolchain alone.
- Do not introduce syntax or standard-library APIs newer than that directive unless the task includes raising the minimum Go version.
- Remember that some behavior changes, notably loop and timer semantics, are selected by the module's `go` version.
- Run `go vet` so its `stdversion` analyzer can catch standard-library symbols newer than the effective Go version.
- Prefer stable APIs. Use `GOEXPERIMENT` packages only when the user explicitly accepts the experiment and its deployment requirements.

## Go 1.22

- Use `sync.OnceValue` and `sync.OnceValues`, introduced in Go 1.21, for lazy immutable initialization that returns one value or a value/error pair; do not hand-roll the same state around `sync.Once`.
- Rely on per-iteration loop variables; do not add `tc := tc` solely to protect closures in modules declaring Go 1.22 or newer.
- Use `for i := range n` when it is clearer than a classic integer loop.
- Use the enhanced `http.ServeMux` method/host/wildcard patterns and `Request.PathValue` for small standard-library HTTP servers when they remove custom routing code.
- Consider `math/rand/v2` for non-cryptographic randomness in new code. Continue to use `crypto/rand` for security-sensitive randomness.

## Go 1.23

- Use range-over-function iterators and the `iter`, `slices`, and `maps` sequence helpers when they simplify a real lazy or composable traversal. Keep ordinary slice and map loops direct.
- Account for new timer semantics in modules declaring Go 1.23 or newer: unreachable timers and tickers can be collected, timer channels are synchronous, and `Stop` or `Reset` prevents stale values. Do not poll `len(timer.C)`.
- Use `go mod tidy -diff` for a non-mutating module-tidiness check.
- Use `unique.Handle` only when canonicalization measurably improves equality or memory use; do not introduce interning speculatively.

## Go 1.24

### Test lifecycle

- Pass `t.Context()` or `b.Context()` into code under test instead of `context.Background()` when the code should stop with the test.
- Remember that the testing context is canceled just before registered cleanup functions run. A cleanup may wait for resources that react to that cancellation.
- Do not pass the already-canceled testing context to a cleanup operation that itself needs time to complete. Create a dedicated bounded cleanup context in that case.
- Use `t.Chdir` or `b.Chdir` rather than changing directories manually. Do not combine process-wide state changes such as `Chdir` or `Setenv` with parallel tests.
- Write new benchmarks as `for b.Loop() { ... }`; keep setup and cleanup outside the loop.

### Modules and libraries

- Track executable build dependencies with `tool` directives in `go.mod`; add them with `go get -tool <package>` and invoke them with `go tool <name>`. Do not create a blank-import `tools.go` in a module that targets Go 1.24 or newer.
- Use generic type aliases when they preserve identity across a migration; do not use them merely to add indirection.
- Use `os.OpenRoot` and `os.Root` for filesystem operations that must remain beneath a directory, including protection from symlink traversal.
- Prefer `runtime.AddCleanup` over `runtime.SetFinalizer` only for nondeterministic fallback cleanup. Keep explicit `Close` methods for resources whose release matters.
- Treat the Go 1.24 `testing/synctest` API as obsolete experimental history. For Go 1.25 or newer, use the stable API below, not `GOEXPERIMENT=synctest` or `synctest.Run`.

## Go 1.25

### Test concurrent and time-based code with synctest

Use `testing/synctest` for concurrent behavior whose correctness depends on timers, deadlines, or reaching quiescence. Prefer it to sleeps, polling loops, injected clocks, and arbitrary `Eventually` windows when the code can remain inside a self-contained bubble.

```go
func TestExpiry(t *testing.T) {
	t.Parallel()

	synctest.Test(t, func(t *testing.T) {
		done := false
		go func() {
			time.Sleep(time.Second)
			done = true
		}()

		time.Sleep(time.Second)
		synctest.Wait()
		if !done {
			t.Fatal("work did not complete")
		}
	})
}
```

- Know that bubble time starts at 2000-01-01 UTC and advances only when every goroutine in the bubble is durably blocked.
- Call `synctest.Wait()` before observing asynchronous state. `Wait` provides synchronization recognized by the race detector; fake time advancing does not.
- Keep the test self-contained. Network I/O, system calls, and mutex waits are not durably blocking. Use in-memory or fake network implementations such as `net.Pipe` where suitable.
- Expect `synctest.Test` to wait for bubbled goroutines and fail on bubble deadlock. Do not leave background goroutines waiting on unreachable future work.
- Still run the race detector; synctest makes schedules deterministic but does not excuse unsynchronized access.

### Concurrency, tooling, and operations

- Use `sync.WaitGroup.Go` for no-result tasks when its ownership is clear. The function passed to it must not panic. Use `errgroup.Group` or explicit result collection when errors or cancellation must propagate.
- Let `go vet` catch `WaitGroup.Add` calls incorrectly placed inside goroutines and host/port formatting that should use `net.JoinHostPort`.
- Account for container-aware, dynamically updated `GOMAXPROCS` on Linux. Do not add a separate automaxprocs dependency or force `runtime.GOMAXPROCS` in new services without a measured reason.
- Consider `runtime/trace.FlightRecorder` when production debugging needs a bounded rolling execution trace captured only when an interesting event occurs.
- Use `T.Attr`, `B.Attr`, or `F.Attr` only when CI consumes structured test attributes. Use `Output` when an API needs an `io.Writer` connected to test logs.
- Keep `encoding/json/v2` opt-in explicit; in Go 1.25 it is still gated by `GOEXPERIMENT=jsonv2`.

## Go 1.26

- Use `new(expression)` for optional scalar or message fields instead of introducing one-off pointer helpers:

  ```go
  input := Request{Limit: new(defaultLimit())}
  ```

- Use the revamped `go fix` modernizers on intentionally scoped packages, then inspect the diff and run tests. Do not run a broad modernization across unrelated dirty work.
- Spell source migration directives exactly as `//go:fix inline` and place the directive on a compatible forwarding declaration. Do not invent variants such as `// go:inline`.
- Prefer `B.Loop` when modernizing old `b.N` benchmarks; Go 1.26 fixes the earlier loop-body inlining limitation.
- Use `testing/cryptotest.SetGlobalRandom` for deterministic tests of standard-library cryptographic operations whose random-reader parameters are now ignored. Because it changes global state, do not use it in parallel tests.
- Prefer `httputil.ReverseProxy.Rewrite` over the deprecated and fundamentally unsafe `Director` hook.
- When handling `os/signal.NotifyContext`, inspect `context.Cause` if the exact terminating signal matters; Go 1.26 cancels it with a cause identifying the signal.
- Do not adopt experimental `simd/archsimd` or `runtime/secret` APIs by default.

## Official sources

- [Go 1.22 release notes](https://go.dev/doc/go1.22)
- [Go 1.23 release notes](https://go.dev/doc/go1.23)
- [Go 1.24 release notes](https://go.dev/doc/go1.24)
- [Go 1.25 release notes](https://go.dev/doc/go1.25)
- [Go 1.26 release notes](https://go.dev/doc/go1.26)
- [`testing` package](https://pkg.go.dev/testing)
- [`testing/synctest` package](https://pkg.go.dev/testing/synctest)
- [`sync` package](https://pkg.go.dev/sync)
