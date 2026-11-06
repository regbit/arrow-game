# AGENTS.md — Operating Instructions

## Project Identity

<!-- Fill this in: what is this project, who is it for, what problem does it solve? -->
**Name:** arrow-game
**One-liner:** A game built around aiming and shooting arrows.
**Vision:** See `.specs/vision.md` for the full product picture.

---

## Operating Rules

### Task Boundaries

- Every task is **bounded**. Before editing, present a short plan: files to touch, what changes, and the order. **Wait for approval** before touching anything (unless the task is a trivial single-file edit).
- **File size cap (hard).** Docs and code files must not exceed 200 lines. A file over 200 lines that is being edited must be split into smaller files as part of that edit. Prefer many small files over a few large ones.
- **Iteration cap (hard).** One iteration = one logical change, targeting ≤ ~200 lines of diff. If a planned change would exceed that, or spans multiple domains, stop and propose a split plan before proceeding.
- Do not broaden scope after inspection unless I explicitly accept the expansion.
- If a task seems to need something outside the stated scope (schema change, new dependency, config change), **stop and ask**.
- One focused diff per task. Unrelated changes go in a separate task.
- **No big-bang transitions.** Multi-file, cross-domain, or migration work happens incrementally; every step leaves the repo consistent and green. Candidates that always require discussion first: format/schema changes, features beyond the vision, refactors restructuring existing code, deletions/renames of established files.
- **Don't invent scope.** Building a deferred item requires a new recorded decision in `okf/decisions/`. It doesn't just get built because it seemed relevant.

### Verification (Two Comparisons)

After completing a task, always:

1. **Run the check** — execute the one-command check (`make check` or the named command from the task brief). Capture the real output.
2. **Report results in structured form:**

   **What changed** — an ordered list of files with a one-line description each, in review order (design/docs first, then code, then tests).

   **How to check it yourself** — concrete scenarios: the exact command to run, what to look for, and the expected output. Any change that affects runtime behavior needs at least one end-to-end "try it" scenario.

   **Status line:**
   ```
   STATUS: passed|failed|not-run
   RAN: <commands with real results>
   NOT RUN: <what couldn't run and why>
   ```

3. **Never claim "passed" without the log behind it.**
4. **An honest "not run" is useful information.** State what's missing (env var, service, migration) so I can fix the tooling.
5. Keep it **scannable**: the maintainer should be able to verify each change with a few commands.

### Red/Green Discipline

- For new behavior: write the test first, show it failing, then make it pass.
- Show me the red run before the green run.
- Never weaken, skip, or delete a test to make it pass.

### What Is NOT Done

A task is not done when:
- The check couldn't run (even if tests would pass in theory)
- The diff touches files outside the stated scope without explanation
- There's no status line or review presentation
- The live behavior hasn't been verified for user-facing changes
- Knowledge base (`okf/`) wasn't updated when behavior changed

### Definition of Done (positive checklist)

A task IS done when all of the following are true:

- [ ] Code + tests green (`make check` passes)
- [ ] `okf/` updated: relevant concepts reflect the new behavior, decisions recorded if any were made, log notes the change
- [ ] `okf_validate` passes (if okf/ was touched)
- [ ] Review presentation delivered: "what changed" (ordered) + "how to check it yourself" (concrete commands)
- [ ] No file exceeds 200 lines (or split was done as part of the change)
- [ ] For user-facing changes: live behavior verified (not just unit tests)

### Hard Gates (Human Approval Required)

The agent must **stop and ask** before:
- Applying database migrations or schema changes
- Deleting files or directories
- Committing, pushing, or deploying
- Installing new dependencies
- Modifying CI configuration
- Touching credentials, secrets, or environment files
- Any operation that is irreversible

### Reporting Honesty

- Report what you actually ran and saw, not what you expected.
- If a test failed and you fixed it, show both the failure and the fix.
- If you're uncertain, say so. Confidence without evidence is worse than uncertainty.
- "I fixed it" is not enough. Show the failing state and the passing state.
- **Same-change doc update.** If implementation reveals a design decision is wrong or incomplete, update the knowledge base in the *same* change. Never let code and docs diverge silently.

---

## Environment

### Commands

| Command | Purpose |
|---------|---------|
| `make check` | Run all tests + lint + type-check (the one-command gate) |
| `make test` | Run tests only |
| `make lint` | Run linter + type checker |
| `make run` | Start the application in dev mode |
| `make clean` | Remove build artifacts |

<!-- Add project-specific commands as the project grows -->

### Key Files

| File/Dir | Purpose |
|----------|---------|
| `AGENTS.md` | This file — persistent context, reinjected every session |
| `.specs/vision.md` | Product vision — the "picture" everything traces back to |
| `.specs/changes/` | Active change proposals (bounded tasks with acceptance criteria) |
| `.specs/archive/` | Completed and archived specs |
| `.specs/deferred.md` | Deferred items ledger — nothing scoped-out is silently lost |
| `okf/` | Knowledge bundle — durable, verified project knowledge (see below) |
| `scripts/check.sh` | The one-command verification script |

### Conventions

<!-- Fill in as project grows. Examples: -->
- Branch naming: `feat/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- Commit style: imperative mood, single line, reference spec ID if applicable
- Code style: [TBD]
- Test style: [TBD]

---

## Knowledge System (OKF)

The `okf/` directory is the project's **knowledge bundle**. It holds durable, verified knowledge that outlives individual tasks. It is organized in two levels:

### Two-Level Pattern

| Level | Where | Purpose | Style |
|-------|-------|---------|-------|
| **Shallow** | `okf/index.md`, first section of each concept (`# Quick Reference`) | Quick recall. Know what exists and what it is in seconds. | Plain language, 2-4 sentences, analogy ok. |
| **Deep** | Body of each concept (`# Detail`) | Instruction manual. Work in the area with confidence. | Dry, technical, on-point. No filler. |

**Rule:** Shallow must be derivable from deep. If they disagree, deep wins. Shallow is a projection of deep, not a separate source of truth.

### When to write to OKF

- A spec ships → distill the durable knowledge into a concept ("how X works, why")
- A non-obvious lesson is discovered → record it (prevents re-learning after compaction)
- A design decision is made → record it in `okf/decisions/` with rationale
- A repeatable procedure emerges → record it in `okf/playbooks/`

### When NOT to write to OKF

- Working state ("I'm currently debugging X") → belongs in the conversation or a spec
- Spec content ("what to build next") → belongs in `.specs/changes/`
- Anything unverified → don't write it. Unverified knowledge is noise.

### Doc-First Workflow

1. **Before any implementation work**, read `okf/index.md` and the specific concept(s) relevant to the task.
2. **`okf/` is the source of truth for design.** If implementation reveals a design decision is wrong, update the bundle in the *same* change.
3. **Respect `status: draft`.** Design concepts with `status: draft` are hypotheses the work must validate, not gospel. When the work settles an open question, promote the concept (update it, resolve the question).
4. **Always run `okf_validate` after touching `okf/`.** Fix every error. YAML gotcha: frontmatter `description` values containing `: ` must be quoted.

### Usage

- **Start** by reading `okf/index.md` to see what knowledge exists.
- **Fetch** a concept only when the task is in that area (just-in-time, not preload).
- **Verify** against the concept's `# Detail` section before making non-obvious changes.
- **Update** when reality diverges from the documented knowledge. Stale knowledge is worse than no knowledge.

### Conventions

- **Numbered decisions.** Entries in `okf/decisions/` use sequential IDs (`D-001`, `D-002`, ...). Each decision is one file. The number is the stable reference.
- **Append-only files rotate.** `okf/log.md` and decision files follow the 200-line cap: when a file exceeds ~200 lines, move older entries into an archive file (e.g., `okf/log-archive-YYYY.md`) and keep the active file current.

### Structure

```
okf/
├── index.md          ← shallow layer for the whole bundle (one line per concept)
├── log.md            ← update history
├── _template.md      ← copy for new concepts
├── concepts/         ← "how X works" knowledge
├── playbooks/        ← "how to do Y" procedures
└── decisions/        ← "why we chose Z" rationale
```

---

## Lessons Learned

<!-- Non-obvious things discovered during development. -->
<!-- Short-term lessons live here. Once a lesson is verified and durable, -->
<!-- promote it to okf/concepts/ with proper provenance. -->
<!-- Format: **Topic:** the lesson. (date, context) -->

(Empty — this grows over time.)

---

## Agent Behavior Norms

- **Own mistakes plainly.** If you made an error, state it, fix it, move on.
- **Be honest about limits.** If you can't see something (runtime, rendered UI, external service), say so and give a precise checklist for what I should verify.
- **Scope large work into verifiable increments.** Not one big unreviewable change.
- **Maintain the deferred items ledger.** If something is out of scope now, record it in `.specs/deferred.md`. Reviving a deferred item requires a recorded decision in `okf/decisions/`.
- **Prefer additive, backward-compatible changes.** A new optional parameter beats a breaking rename.
- **The spec is the source of truth for behavior.** If the code and spec disagree, the spec wins until I say otherwise.
- **Incremental over holistic.** Every step leaves the repo consistent and green. If a change can't be made incrementally, discuss the approach first.
