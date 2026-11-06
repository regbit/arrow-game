# Knowledge Bundle Log

## 2026-11-06
* **Update**: Russian added as the default UI language with a one-tap RU/EN switch on the setup screen (spec 20261106-russian-default). Language is in-memory only; persistence stays deferred.
* **Decision**: Owner removed the 200-line cap for `index.html` — the one-pager form (D-001) is worth more than a size limit. Updated AGENTS.md (exception), D-001 (amended, no split planned), and spec 20261106-core-round-loop.
* **Update**: Game flow settled by owner — countdown 3·2·1 → timed left/right arrow (default 3s) → ~0.5s blank, fully timer-driven (no taps), portrait, physical scoring (most figures wins). Wrote spec `20261106-core-round-loop` (proposed); updated vision and [game loop](/concepts/game-loop.md) concept; deferred ledger filled (score tracking, tiebreak, landscape, extra sounds, persistence).
* **Update**: Project setup — filled `.specs/vision.md` (physical reaction game), added `index.html` shell, wired Makefile/check.sh/README.
* **Creation**: Recorded [D-001](/decisions/D-001-single-file-html-github-pages.md): single-file HTML, no build, GitHub Pages from repo root.
* **Creation**: Added draft [game loop](/concepts/game-loop.md) concept (design hypothesis with open questions).
* **Initialization**: Created OKF bundle for arrow-game. Baseline from template.
