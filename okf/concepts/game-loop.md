---
type: Reference
title: "Game loop (draft design)"
description: "The round flow: setup sliders, black-screen guard, arrow flash, figure grab, win condition."
tags: [design, gameplay]
status: draft
generated: { by: human:regbit, at: 2026-11-06T18:30:00Z }
---

# Quick Reference

The phone is the game controller in a table-top reaction game. Players lay
figures in front of each side of the phone. Each round the screen goes
black (guards against early grabs), then flashes an arrow pointing left or
right; players race to grab a figure from the indicated side. Setup
sliders control figures per side and clock speed.

# Detail

## States

- **Setup** — two sliders (figures per side, clock speed) + start.
- **Black** — solid black screen. Prevents anticipatory grabbing.
- **Arrow** — full-screen left or right arrow (relative to the phone) +
  sound cue. Shown until the round ends.
- **Round end / next** — undecided (open question below).
- **Game over** — one side has no figures left.

## Clock speed

Interpretation (unverified): the slider scales the black-screen delay —
the reaction window. Longer black = easier (kids); shorter = harder. The
delay should vary within the slider's range so players can't learn the
rhythm.

## Open questions

Resolve before the core-loop spec is written:

1. **Who grabs?** Only the player on the indicated side, or do both
   players race for the indicated side's figures?
2. **How are figures scored?** The winner takes a figure for their side,
   or the indicated side simply loses one?
3. **Win condition** — first side to run out of figures loses, or a fixed
   number of rounds?
4. **Round end** — winner taps the screen, or the game auto-advances
   after a fixed time?
5. **Phone orientation** — portrait or landscape on the table?

## Working With This

This is a design hypothesis, not implemented behavior. When the core-loop
spec (`.specs/changes/`) settles these questions, update this concept,
promote `status` to `stable`, and drop the resolved questions.
