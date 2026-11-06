# Spec System

This directory contains the specification system for the project.

## Structure

```
.specs/
├── README.md          ← this file
├── vision.md          ← the product picture (everything traces back here)
├── deferred.md        ← deferred items ledger (nothing is silently lost)
├── changes/           ← active change proposals
│   ├── _template.md   ← copy this for a new change
│   └── YYYYMMDD-slug.md
└── archive/           ← completed specs (archived, still referenceable)
```

## The Loop

```
Intent → Proposal → Validate → Implement (TDD) → Verify → Live DoD → Archive
```

1. **Proposal** — a capability is written down before code. Copy `_template.md`, fill it in.
2. **Validate** — check that the proposal is complete: all sections filled, scenarios are testable, tasks are bounded.
3. **Implement** — build test-first. Each task in the proposal is a verifiable increment.
4. **Verify** — independent check: run the one-command gate, re-run in a clean state.
5. **Live DoD** — the human clicks through the real behavior. Green tests ≠ done.
6. **Archive** — move the spec to `archive/`. The vision doc is updated to reflect shipped reality.

## Rules

- **The spec is the bounded authority.** The agent may produce work but may not expand scope beyond the approved spec.
- **One spec per change.** Don't bundle unrelated changes.
- **Scenarios are the acceptance tests in prose.** If a requirement can't be phrased as an observable WHEN/THEN, it isn't a requirement yet.
- **The vision is updated when a spec ships.** If the spec changed what we're building, the vision reflects it.
- **Deferred items go to `deferred.md`.** Never silently dropped.

## IDs

Format: `YYYYMMDD-slug` (e.g., `20251031-auth-flow`)
- Date is when the proposal was created
- Slug is a short kebab-case identifier
- Referenced in commit messages: `feat: add auth flow (20251031-auth-flow)`
