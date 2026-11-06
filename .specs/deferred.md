# Deferred Items Ledger

<!-- Nothing scoped-out is silently lost. If a change proposal defers work, it lands here. -->
<!-- Format: - [item] — deferred from [spec ID], reason: [why], revisit when: [condition] -->

- In-game score tracking (per-player tally; winner-tap attribution) —
  deferred from 20261106-core-round-loop, reason: the settled flow is
  timer-driven with no taps, so grabs can't be attributed; physical
  counting is simpler for v1, revisit when: players want the phone to
  announce the winner
- In-game tiebreak (sudden-death round) — deferred from
  20261106-core-round-loop, reason: ties are settled by the players
  themselves (e.g. one figure in the center, one more race), revisit
  when: score tracking lands
- Landscape mode — deferred from 20261106-core-round-loop, reason:
  portrait is the settled layout (players at the phone's two ends),
  revisit when: a different table layout is wanted
- Sounds beyond the arrow beep — deferred from 20261106-core-round-loop,
  reason: keep v1 minimal (no assets), revisit when: the core loop is
  proven fun
- Settings persistence / high scores — deferred from
  20261106-core-round-loop, reason: zero-friction v1 keeps no stored
  state, revisit when: the same kids replay often and want settings kept
