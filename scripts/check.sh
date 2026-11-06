#!/usr/bin/env bash
# scripts/check.sh — the one-command verification gate
# This is what the agent runs to prove its work. It's also what you run independently.
# Add your project's checks here as the project grows.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

PASS=0
FAIL=0
SKIP=0

report() {
  local status="$1" name="$2" output="${3:-}"
  case "$status" in
    pass) PASS=$((PASS+1)); echo "  ✅ $name" ;;
    fail) FAIL=$((FAIL+1)); echo "  ❌ $name"; [ -n "$output" ] && echo "     $output" | head -20 ;;
    skip) SKIP=$((SKIP+1)); echo "  ⏭️  $name (skipped)" ;;
  esac
}

echo "=== Check Gate ==="
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'detached')"
echo ""

# --- Project checks ---
# Static single-file game (D-001): no test runner, no linter. Checks
# validate the HTML file directly. Add runtime checks when game code lands.

# index.html exists and is non-trivial
if [ -f "index.html" ]; then
  lines=$(wc -l < index.html)
  if [ "$lines" -ge 10 ]; then
    report pass "index.html present ($lines lines)"
  else
    report fail "index.html present" "too small ($lines lines)"
  fi
else
  report fail "index.html present" "index.html not found"
fi

# mobile viewport meta (the game runs on phones)
if [ -f "index.html" ] && grep -q 'name="viewport"' index.html; then
  report pass "mobile viewport meta"
else
  report fail "mobile viewport meta" "missing <meta name=\"viewport\">"
fi

# no external http(s) references (must work offline once loaded)
if [ -f "index.html" ] && grep -Eq '(src|href)="https?://' index.html; then
  report fail "no external URLs" "found external http(s) reference in index.html"
else
  report pass "no external URLs"
fi

# HTML sanity: doctype + closing tag
if [ -f "index.html" ] && head -1 index.html | grep -qi '<!doctype html>' && grep -qi '</html>' index.html; then
  report pass "HTML sanity"
else
  report fail "HTML sanity" "missing doctype or </html>"
fi

# --- Summary ---
echo ""
echo "=== Summary ==="
echo "  Passed: $PASS"
echo "  Failed: $FAIL"
echo "  Skipped: $SKIP"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "RESULT: FAILED"
  exit 1
elif [ "$PASS" -eq 0 ]; then
  echo "RESULT: NO CHECKS CONFIGURED (add checks to scripts/check.sh)"
  exit 0
else
  echo "RESULT: PASSED"
  exit 0
fi
