# Change: [Short Title]

**ID:** [YYYYMMDD-slug, e.g., 20251031-auth-flow]
**Status:** proposed | in-progress | verifying | done | rejected
**Vision ref:** [section or line in vision.md this traces back to]
**Date:** [YYYY-MM-DD]

---

## Why

[The problem, in 1-2 paragraphs. Why does this need to happen now? What breaks or is missing without it?]

## What Changes

[Named deltas. Bullets. Each one is a verifiable unit.]
- [delta 1]
- [delta 2]

## Impact

**Affected specs:** [which vision sections or existing specs this touches]
**Affected code:** [files/modules likely in scope]
**NOT touched:** [explicit statement of what stays still — this is half the value]
- No schema change
- No new dependencies
- [etc.]

## Design

[The load-bearing decisions. State alternatives considered and why they were rejected.]

### Decision: [name]
- **Choice:** [what we're doing]
- **Alternatives:** [what we considered and why not]
- **Hard parts:** [the thing that will actually be painful — so the implementer doesn't discover it mid-build]

## Spec Delta

### ADDED Requirements

#### Requirement: [name]
[Single SHALL statement — what must be true, not how.]

#### Scenario: [name]
- **WHEN** [condition]
- **THEN** [observable outcome]
- **AND** [additional outcome if applicable]

### MODIFIED Requirements
[If changing existing behavior, quote the old requirement and show the delta.]

### REMOVED Requirements
[If removing behavior, name it and justify.]

## Tasks

<!-- TDD-ordered. Each task is small enough to verify independently. -->

### Implementation
- [ ] Write failing test for [scenario]
- [ ] Implement [delta] to pass the test
- [ ] [next increment]

### Verification
- [ ] `make check` passes
- [ ] [specific check for this change]

### Live DoD (human runs this)
- [ ] [click-through of the real behavior]
- [ ] [verify the edge case manually]
- [ ] Confirm: [the observable thing that proves it works]

## Notes for Implementer

- **Scope fence:** [e.g., "This change adds no DDL. If a task seems to need schema, stop — it's out of scope."]
- **Source of truth:** This document is the source of truth for behavior and tests.
- **Context:** [any pointers to relevant files, patterns, or prior art]

## Status Line (filled at completion)

```
STATUS: [passed|failed|not-run]
RAN: [commands with real results]
NOT RUN: [what couldn't run and why]
CHANGED: [files modified]
```
