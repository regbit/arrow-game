---
type: Reference
title: "Game loop"
description: "The round flow: setup, 3-2-1 countdown, timed left/right arrows, quick blank, physical scoring."
tags: [design, gameplay]
status: stable
generated: { by: human:regbit, at: 2026-11-06T18:30:00Z }
updated: { by: human:regbit, at: 2026-11-06T20:00:00Z }
---

# Quick Reference

The phone is the referee in a table-top reaction game. It lies portrait
in the middle; two players sit across from each other at its two ends,
with rows of figures to the **left** and **right** of the phone. After a
3·2·1 countdown the phone cycles: arrow (left or right, ~3s) → quick
blank (~0.5s) → arrow… until all figures are taken. Both players race to
the indicated row each time; the player with the most figures wins
(counted by hand).

# Detail

## Layout

```
          Player A
    F  [ portrait ]  F
    F  [   phone  ]  F
    F  [ portrait ]  F
          Player B
```

Arrow points **left** or **right** (relative to the phone's screen).

## States

- **Setup** — sliders: figures per side (2–8, default 4); arrow duration
  (1–5s, default 3s, step 0.5). Start.
- **Countdown** — 3 · 2 · 1, one second each.
- **Arrow** — big left/right arrow + beep, visible for the configured
  duration. One figure is consumed from the indicated side.
- **Blank** — 0.5s; players put figures down and reset.
- **Game over** — "Count your figures — most wins." + play again.

## Direction

Random, weighted by remaining figures: `P(left) = left/(left+right)`.
Never points at an empty side; the game always ends at exactly 2N arrows.

## Scoring is physical

The game is fully timer-driven — no taps after start — so it cannot know
who took which figure. Players count their own figures. The game only
shows remaining counts per side during play.

## Timing

- Countdown: 3 × 1s, fixed
- Arrow: slider 1–5s (default 3s)
- Blank: 0.5s, fixed

## Testable core

Pure functions in a sentinel-marked block in `index.html`:
`totalArrows(n)`, `pickDirection(remainingL, remainingR, rng)`,
`nextPhase(phase, arrowsFired, total)`. Tested by
`scripts/test-game.mjs` (plain node, no framework).

## Working With This

Live-verified on a phone 2026-11-06 (owner, positive feedback); specs
`20261106-core-round-loop` and `20261106-russian-default` are archived.

Deferred (see `.specs/deferred.md`): in-game score tracking, in-game
tiebreak, landscape mode, sounds beyond the beep, settings persistence.
