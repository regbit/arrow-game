# Change: Core round loop

**ID:** 20261106-core-round-loop
**Status:** done (live-verified on a phone 2026-11-06, positive feedback)
**Vision ref:** .specs/vision.md — Core experience, In Scope (v1)
**Design ref:** okf/concepts/game-loop.md
**Date:** 2026-11-06

---

## Why

`index.html` is a shell. This change implements the full core loop per the
settled flow: setup → 3·2·1 countdown → timed arrow cycle → game over.
Fully timer-driven (no taps): the phone is a referee, players race in the
physical world, scoring is counted by hand.

## What Changes

- Setup screen: figures-per-side slider (2–8, default 4), arrow-duration
  slider (1–5s, default 3s, step 0.5), start
- Countdown 3·2·1 (1s each) on start
- Arrow cycle: big left/right arrow + WebAudio beep, visible for the
  configured duration → 0.5s blank → next arrow, 2N times total
- Direction: random weighted by remaining figures (never points at an
  empty side)
- HUD: remaining figures per side, visible during play
- Game over: "Count your figures — most wins" + play again
- Sentinel pure-logic block in `index.html`, tested by new
  `scripts/test-game.mjs` (plain node, no npm)
- `check.sh`: new "game logic tests" check

## Impact

**Affected specs:** vision.md (Core experience, flow), game-loop concept
**Affected code:** `index.html`, `scripts/check.sh`, `scripts/test-game.mjs` (new)
**NOT touched:**
- No dependencies, no build step, no external URLs (D-001)
- No tap input, no per-player score tracking (physical scoring)
- No landscape mode, no sounds beyond the beep (deferred)
- `index.html` is exempt from the 200-line cap (one-pager, D-001)

## Design

### Decision: timer-driven loop, no taps
- **Choice:** the game cycles on its own: countdown → [arrow (D s) →
  blank (0.5 s)] × 2N → game over. No input after pressing start.
- **Alternatives:** winner-tap to advance (rejected — the settled flow is
  timer-driven; a tap would also need attribution UI).
- **Hard parts:** the loop must not drift or double-fire. One async
  sequence driven by chained `setTimeout`s; a generation counter so
  "play again" cancels any in-flight timeouts.

### Decision: physical scoring
- **Choice:** the game does not track who took which figure. Players count
  their own figures; the game only shows remaining counts per side.
- **Alternatives:** in-game tally via tap attribution (rejected — no taps
  in the flow; landed in deferred ledger).
- **Hard parts:** none — this removes a state.

### Decision: weighted random direction
- **Choice:** P(left) = leftRemaining/(left+right). Never picks an empty
  side; the game always ends at exactly 2N arrows.
- **Alternatives:** pure 50/50 (rejected — late-game arrows at empty
  sides are no-ops and confusing).
- **Hard parts:** inject `rng` for testability; production uses
  `Math.random`.

### Decision: plain-node test harness, no framework
- **Choice:** `scripts/test-game.mjs` extracts the sentinel pure-logic
  block from `index.html` and asserts on it with a ~10-line check
  helper. No npm.
- **Alternatives:** jest/vitest (rejected — npm deps violate D-001); no
  tests (rejected — red/green discipline is a project rule).
- **Hard parts:** extraction must be robust — exact sentinel comments,
  fail loudly if the block is missing.

## Spec Delta

### ADDED Requirements

#### Requirement: Setup
The game SHALL present a setup screen with a figures-per-side slider
(2–8, default 4), an arrow-duration slider (1–5s, default 3s, step 0.5),
and a start control.

#### Scenario: start with defaults
- **WHEN** the player presses start with defaults
- **THEN** the countdown begins with 4 figures per side and a 3s arrow duration

#### Requirement: Countdown
The game SHALL display a 3-2-1 countdown, 1 second each, before the first arrow.

#### Scenario: countdown precedes first arrow
- **WHEN** the game starts
- **THEN** "3", "2", "1" are shown for 1s each
- **AND** the first arrow appears only after "1"

#### Requirement: Arrow cycle
Each arrow SHALL be visible for exactly the configured duration and play
a beep when it appears. After each arrow the game SHALL show a blank
screen for 0.5s before the next arrow.

#### Scenario: arrow timing
- **WHEN** arrow duration is set to 3s
- **THEN** the arrow is visible for 3s
- **AND** a 0.5s blank screen follows
- **AND** the next arrow follows the blank

#### Requirement: Direction
The arrow direction SHALL be random, weighted by remaining figures per
side, and SHALL NOT pick a side with 0 figures.

#### Scenario: empty side is never picked
- **WHEN** the left side has 0 figures and the right has 2
- **THEN** every arrow points right

#### Scenario: weighting
- **WHEN** left has 3 figures and right has 1
- **THEN** over many rounds left is picked ~3x as often as right

#### Requirement: Consumption and end
The game SHALL consume one figure from the indicated side per arrow and
SHALL end when all 2N figures have been taken.

#### Scenario: game length
- **WHEN** 4 figures are set per side
- **THEN** exactly 8 arrows appear
- **AND** the game-over screen appears after the 8th arrow's blank

#### Requirement: Game over
The game-over screen SHALL tell the players to count their figures (most
wins) and offer play again with the same settings.

#### Scenario: play again
- **WHEN** the player taps play again
- **THEN** the game restarts at the countdown with the same settings

## Tasks

### Implementation
- [x] Write `scripts/test-game.mjs` (harness + tests: `totalArrows`,
      `pickDirection` empty/weighting/boundary, `nextPhase` transitions,
      timing constants, full-loop simulation)
- [x] Run it → show RED (logic block missing)
- [x] Add the sentinel pure-logic block to `index.html` (constants,
      `totalArrows`, `pickDirection`, `nextPhase`)
- [x] Run it → show GREEN
- [x] Implement UI: setup screen, countdown, arrow + beep, blank, HUD,
      game over
- [x] Wire the async loop through the pure functions (generation counter
      for clean restart)
- [x] Add "game logic tests" check to `scripts/check.sh`
- [x] `make check` green

### Verification
- [x] `node scripts/test-game.mjs` passes
- [x] `make check` passes (includes the new check)
- [x] `node --check` on the extracted inline JS (syntax)

### Live DoD (human runs this)
- [ ] Phone, portrait: setup → start
- [ ] Observe: 3·2·1 → arrow ~3s + beep → ~0.5s blank → arrow…
- [ ] With 2 per side: exactly 4 arrows; last arrow points at the side
      that still has a figure
- [ ] Game over: "count your figures" + play again works
- [ ] Full game (4 per side) lasts under 4 minutes
- [ ] Works in latest iOS Safari and Android Chrome

## Notes for Implementer

- **Scope fence:** no taps, no score tracking, no extra sounds, no
  landscape. If a task seems to need one, stop — it's out of scope.
- **Source of truth:** this document.
- **Context:** D-001 (static, no build), game-loop concept. Beep:
  WebAudio oscillator (~800 Hz, 150 ms); create the AudioContext on the
  start tap to satisfy autoplay policies.
- **File cap:** `index.html` is exempt (one-pager, D-001).

## Status Line (filled at completion)

```
STATUS: passed
RAN: node scripts/test-game.mjs (20 passed, 0 failed) · make check (5/5) ·
     node --check on extracted inline JS (OK)
NOT RUN: Live DoD (needs a phone + human)
CHANGED: index.html (full game) · scripts/test-game.mjs (new) ·
         scripts/check.sh (+game logic check)
```
