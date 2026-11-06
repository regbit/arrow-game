---
type: Decision
title: "D-001: Single-file HTML, no build, GitHub Pages from repo root"
description: "The game ships as one index.html at the repo root, deployed to GitHub Pages with no build step."
tags: [deployment, architecture]
status: stable
generated: { by: human:regbit, at: 2026-11-06T18:30:00Z }
---

# D-001: Single-file HTML, no build, GitHub Pages from repo root

**Date:** 2026-11-06
**Status:** active
**Context:** Project setup (pre-first-spec).

## Decision

The game is a single `index.html` at the repo root (all CSS and JS
inline). No build step, no dependencies. It deploys to GitHub Pages
directly from the `main` branch root.

## Rationale

- The game is tiny by design ("don't overbloat"); a build pipeline is
  dead weight for a few hundred lines.
- Kids open the game from a link on a phone: GitHub Pages gives a free,
  shareable, always-on HTTPS URL with zero hosting effort.
- `index.html` at the repo root means Pages serves the game at the site
  root URL — no subpath, no config file.
- One file makes the whole game easy to review, copy, and test in a
  single browser tab.

## Consequences

- `index.html` is exempt from the 200-line file cap in AGENTS.md — the
  one-pager form is the decision; no split is planned (owner decision,
  2026-11-06, amending this decision's earlier ~500-line split rule).
- No bundler, no framework, no npm. Local dev is `make run` (a static
  file server).
- `make check` validates static properties of the HTML; runtime checks
  are added when game code lands.
