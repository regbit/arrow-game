# Product Vision

## What We're Building

A physical-digital reaction game for kids. Two players sit on opposite
sides of a phone laid on a table, with rows of toy figures in front of
each of them:

```
F F F F    PHONE    F F F F
```

The phone is the game controller: it runs the round flow while players
race with their hands to take a figure from the side the screen
indicates. The game is a single HTML page opened in a phone browser,
hosted on GitHub Pages — no install, no account, just a link.

The emotional core is the sudden snap of a round: stillness (black
screen), then a flash, then hands moving. The figures on the table give
the game stakes and a visible scoreboard — as the game progresses, the
rows of figures shrink.

## The Core Experience

- Figures are laid out in front of each player (setup slider sets how
  many per side), phone centered between them.
- Setup screen: two sliders — figures per side, clock speed — plus start.
- A round fires: the screen goes **black** (guards against early grabs).
- After a variable delay, an **arrow** flashes — left or right, relative
  to the phone — with a sound cue.
- Players race to grab a figure from the indicated side as fast as they
  can.
- Rounds repeat until the game ends (win rule: open question, see
  `okf/concepts/game-loop.md`).

## Principles

- **Kids first:** big visuals, no text to read mid-round, one obvious
  action (grab a figure).
- **Feel first:** the black → flash → arrow sequence must be crisp; the
  delay varies so players can't learn the rhythm.
- **Zero friction:** open the link on a phone and play within 30
  seconds. No install, no account, works offline once loaded.
- **The table is the UI:** the figures are the scoreboard and the stakes;
  the screen only shows the trigger.

## Scope

### In Scope (v1)
- Single-page HTML game: one `index.html`, all CSS/JS inline, no build
  step (D-001)
- Setup screen: figures-per-side slider, clock-speed slider, start button
- Round flow: black screen → variable delay → left/right arrow flash +
  sound cue
- Figure counts per side and a win state
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

## Open Questions

- Win rule and how figures are scored (see draft concept)
- Who ends a round: winner taps the screen, or auto-advance?
- Phone orientation: portrait or landscape on the table?

---

## Changelog

- [2026-11-06] Filled in: physical reaction game, phone as game
  controller, single-file HTML on GitHub Pages.
- [2026-11-06] Vision document created. Baseline for arrow-game.
