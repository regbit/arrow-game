// scripts/test-game.mjs
// Plain-node test harness for arrow-game's pure game logic. No deps, no npm.
// Extracts the sentinel-marked block from index.html and asserts on it.
// Usage: node scripts/test-game.mjs
//
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'), 'utf8');

const START = '// === pure game logic (tested by scripts/test-game.mjs) ===';
const END = '// === end pure game logic ===';
const s = html.indexOf(START);
const e = html.indexOf(END);
if (s === -1 || e === -1 || e < s) {
  console.error('FAIL: pure game logic block not found in index.html');
  process.exit(1);
}
const block = html.slice(s, e + END.length);

const api = new Function(
  block +
    '\nreturn { FIGS_MIN, FIGS_MAX, FIGS_DEFAULT, DURATION_MIN, DURATION_MAX, ' +
    'DURATION_DEFAULT, BLANK_MS, COUNTDOWN_STEPS, totalArrows, pickDirection, nextPhase };'
)();
const {
  FIGS_MIN, FIGS_MAX, FIGS_DEFAULT,
  DURATION_MIN, DURATION_MAX, DURATION_DEFAULT,
  BLANK_MS, COUNTDOWN_STEPS,
  totalArrows, pickDirection, nextPhase,
} = api;

let passed = 0;
let failed = 0;
function check(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ok   ' + name);
  } catch (err) {
    failed++;
    console.log('  FAIL ' + name + ' — ' + err.message);
  }
}
function eq(actual, expected, msg) {
  if (actual !== expected) throw new Error((msg ? msg + ': ' : '') + 'expected ' + expected + ', got ' + actual);
}

console.log('totalArrows');
check('2 per side -> 4 arrows', () => eq(totalArrows(2), 4));
check('4 per side -> 8 arrows', () => eq(totalArrows(4), 8));
check('8 per side -> 16 arrows', () => eq(totalArrows(8), 16));

console.log('config bounds');
check('figures slider: 2..8, default 4', () => { eq(FIGS_MIN, 2); eq(FIGS_MAX, 8); eq(FIGS_DEFAULT, 4); });
check('duration slider: 1..5s, default 3s', () => { eq(DURATION_MIN, 1); eq(DURATION_MAX, 5); eq(DURATION_DEFAULT, 3); });
check('blank is 500 ms', () => eq(BLANK_MS, 500));
check('countdown is 3 steps', () => eq(COUNTDOWN_STEPS, 3));

console.log('pickDirection');
check('never picks empty side (left=0)', () => {
  for (let i = 0; i < 50; i++) eq(pickDirection(0, 3, () => Math.random()), 'right');
});
check('never picks empty side (right=0)', () => {
  for (let i = 0; i < 50; i++) eq(pickDirection(3, 0, () => Math.random()), 'left');
});
check('both empty -> null', () => eq(pickDirection(0, 0, () => 0.5), null));
check('boundary: equal sides, rng < 0.5 -> left', () => eq(pickDirection(1, 1, () => 0.499), 'left'));
check('boundary: equal sides, rng >= 0.5 -> right', () => eq(pickDirection(1, 1, () => 0.5), 'right'));
check('weighting: 3v1, rng 0.4 -> left (1.6 < 3)', () => eq(pickDirection(3, 1, () => 0.4), 'left'));
check('weighting: 3v1, rng 0.8 -> right (3.2 >= 3)', () => eq(pickDirection(3, 1, () => 0.8), 'right'));
check('weighting: ~3:1 frequency over 100k draws', () => {
  let left = 0;
  const n = 100000;
  for (let i = 0; i < n; i++) if (pickDirection(3, 1, Math.random) === 'left') left++;
  const ratio = left / (n - left);
  if (ratio < 2.8 || ratio > 3.2) throw new Error('left:right ratio ' + ratio.toFixed(2) + ' is not ~3');
});

console.log('full loop simulation');
check('a game ends at exactly 2N arrows, 0 left on both sides', () => {
  for (const n of [2, 4, 8]) {
    let left = n, right = n, fired = 0, leftShots = 0;
    const total = totalArrows(n);
    for (;;) {
      const dir = pickDirection(left, right, Math.random);
      fired++;
      if (dir === 'left') { left--; leftShots++; } else right--;
      if (nextPhase('blank', fired, total) === 'gameover') break;
    }
    eq(fired, total, 'n=' + n + ' fired');
    eq(left, 0, 'n=' + n + ' left');
    eq(right, 0, 'n=' + n + ' right');
    eq(leftShots, n, 'n=' + n + ' leftShots');
  }
});

console.log('nextPhase');
check('countdown -> arrow', () => eq(nextPhase('countdown', 0, 8), 'arrow'));
check('arrow -> blank', () => eq(nextPhase('arrow', 0, 8), 'blank'));
check('blank -> arrow while arrows remain', () => eq(nextPhase('blank', 3, 8), 'arrow'));
check('blank -> gameover when all fired', () => eq(nextPhase('blank', 8, 8), 'gameover'));

console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
