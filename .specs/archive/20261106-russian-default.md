# Russian language (default) + RU/EN switch

**ID:** 20261106-russian-default
**Status:** done (live-verified on a phone 2026-11-06, positive feedback)

## Why

The primary players (kids) are Russian speakers. The owner requested
Russian as the default language, with English reachable via a one-tap
switch.

## What

- All UI strings in two languages: **RU (default)** and **EN**.
- A small language button, fixed top-right on the setup screen, shows the
  *other* language ("EN" while RU is active). Tapping it re-renders the
  setup screen in the new language and **preserves slider values**.
- The button is hidden during play and on the game-over screen.
- The document title follows the active language.
- Language lives in memory only — no persistence (persistence is on the
  deferred ledger; reviving it needs a recorded decision).
- The pure game-logic block is untouched; the existing 20 tests apply
  unchanged.

## Strings

| Key | RU | EN |
|-----|----|----|
| name | Стрела | Arrow |
| docTitle | Стрела — игра на реакцию | Arrow — reaction game |
| figures | Фигурок на сторону | Figures per side |
| duration | Время стрелы (сек) | Arrow duration (s) |
| start | Старт | Start |
| left / right (HUD) | слева / справа | left / right |
| over | Игра окончена | Game over |
| count | Посчитайте свои фигурки — победит тот, у кого больше! | Count your figures — most wins! |
| again | Ещё раз | Play again |
| settings | Настройки | Settings |

## Acceptance

- [x] Page loads in Russian by default
- [x] Tap the switch → everything re-renders in English; tap again → back
      to Russian
- [x] Slider values survive a language switch
- [x] HUD, game-over screen, and document title follow the language
- [x] `make check` green (pure logic untouched)

## Status

```
STATUS: passed
RAN: node --check on extracted inline JS (OK) · make check (5/5, logic tests 20/20)
NOT RUN: live phone check (needs human)
CHANGED: index.html (i18n) · okf/log.md
```
