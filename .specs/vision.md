# Product Vision

## What We're Building

A physical-digital reaction game for kids. Two players sit across from
each other at the two ends of a portrait phone laid on a table, with
rows of toy figures to the left and right of the phone:

```
          Player A
    F  [ portrait ]  F
    F  [   phone  ]  F
    F  [ portrait ]  F
          Player B
```

The phone is the game controller: it runs the round flow while players
race with their hands to take a figure from the side the screen
indicates. The game is a single HTML page opened in a phone browser,
hosted on GitHub Pages — no install, no account, just a link.

The emotional core is the sudden snap of an arrow: stillness (quick
blank), then a flash, then hands moving. The figures on the table give
the game stakes and a visible scoreboard — as the game progresses, the
rows of figures shrink.

## The Core Experience

- Figures are laid out on the left and right of the portrait phone
  (setup slider sets how many per side); players sit at its two ends.
- Setup screen: two sliders — figures per side, arrow duration — plus
  start.
- On start: a **3·2·1 countdown** to get ready.
- Then the cycle: an **arrow** — left or right, relative to the phone —
  with a sound cue, visible for the configured duration (default 3s).
  Both players race to grab a figure from the indicated row.
- A **quick blank** (~0.5s) while players reset, then a new arrow.
- The cycle repeats until all figures are taken (2N arrows); the player
  with the most figures wins — counted by hand.

Full design: `okf/concepts/game-loop.md`; build spec:
`.specs/changes/20261106-core-round-loop.md`.

## Principles

- **Kids first:** big visuals, no text to read mid-round, one obvious
  action (grab a figure).
- **Feel first:** the arrow → blank → arrow rhythm must be crisp and
  readable; the direction is random so players can't anticipate which
  row to attack.
- **Zero friction:** open the link on a phone and play within 30
  seconds. No install, no account, works offline once loaded.
- **The table is the UI:** the figures are the scoreboard and the stakes;
  the screen only shows the trigger.

## Scope

### In Scope (v1)
- Single-page HTML game: one `index.html`, all CSS/JS inline, no build
  step (D-001)
- Setup screen: figures-per-side slider, arrow-duration slider, start
- Round flow: 3·2·1 countdown → timed left/right arrow + beep → quick
  blank → repeat until all figures are taken
- Figure counts per side and a game-over state (count figures, most wins)
- GitHub Pages deployment from the repo root

### Out of Scope (explicit)
- No networked multiplayer — one phone, two people at a table
- No accounts, saved progress, or leaderboards
- No art assets or sound libraries — plain shapes, WebAudio beeps
- No app wrappers (no PWA install prompt, no iOS/Android packaging)

## Success Criteria

- A child can start a game from a phone link in under 30 seconds
- A full game (default figure count) lasts 2–4 minutes
- The round flow feels snappy; delay variation makes early grabs risky
- Works in latest iOS Safari and Android Chrome

## Resolved Questions

- **Win rule / scoring:** all figures taken; most figures wins, counted
  by hand. (2026-11-06)
- **Round end:** fully timer-driven — no taps after start. (2026-11-06)
- **Phone orientation:** portrait, players at the phone's two ends,
  figures on its left and right. (2026-11-06)

---

## Changelog

- [2026-11-06] Flow settled: countdown → timed arrow → quick blank
cycle; timer-driven (no taps); portrait; physical scoring. Open
questions resolved.
- [2026-11-06] Filled in: physical reaction game, phone as game
  controller, single-file HTML on GitHub Pages.
- [2026-11-06] Vision document created. Baseline for arrow-game.
