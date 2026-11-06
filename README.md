# arrow-game

A physical-digital reaction game for kids. Two players lay toy figures on
either side of a phone on a table. The phone flashes black, then an arrow
— players race to grab a figure from the indicated side. Single HTML file,
no build step, hosted on GitHub Pages.

See `.specs/vision.md` for the full picture.

## Status

Setup complete — `index.html` is a shell. The core round loop is the next
bounded spec (`.specs/changes/`).

## Run

```bash
make run            # serves http://localhost:8000
# or open index.html directly in a browser
```

## Check

```bash
make check          # one-command gate (scripts/check.sh)
```

## Deploy to GitHub Pages

1. Create an empty repo on GitHub (no README/template).
2. Push:
   ```bash
   git remote add origin git@github.com:<you>/arrow-game.git
   git add -A && git commit -m "arrow-game: project setup"
   git push -u origin main
   ```
3. Repo → Settings → Pages → **Source: Deploy from a branch** → branch
   `main`, folder `/(root)` → Save.
4. Game URL: `https://<you>.github.io/arrow-game/`

## Structure

```
├── index.html             ← the whole game (one file, no build)
├── Makefile               ← make check / run / spec-*
├── scripts/check.sh       ← one-command verification gate
├── .specs/                ← vision, change proposals, deferred ledger
└── okf/                   ← durable knowledge bundle
```

## The loop

```
vision.md → .specs/changes/ (bounded proposal) → implement → make check
→ you verify live → archive spec → distill into okf/
```
