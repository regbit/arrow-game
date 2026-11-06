# Makefile — project entry points

.PHONY: check test lint run clean spec-new spec-list

# The one-command gate
check:
	@bash scripts/check.sh

# Individual checks — single static project, both run the gate
test:
	@bash scripts/check.sh

lint:
	@bash scripts/check.sh

# Serve the game locally: http://localhost:8000
run:
	@python3 -m http.server 8000

clean:
	@echo "Nothing to clean (no build step)."

# --- Spec helpers ---

# Create a new change proposal from template
spec-new:
	@id=$$(date +%Y%m%d)-$$([ -n "$(slug)" ] && echo "$(slug)" || echo "tbd") \
	&& cp .specs/changes/_template.md ".specs/changes/$$id.md" \
	&& echo "Created: .specs/changes/$$id.md" \
	&& echo "Edit it to fill in the proposal."

# List active specs
spec-list:
	@echo "Active change proposals:"
	@ls -1 .specs/changes/*.md 2>/dev/null | grep -v _template | while read f; do \
		id=$$(basename "$$f" .md); \
		status=$$(grep -m1 '^\*\*Status:\*\*' "$$f" 2>/dev/null | sed 's/.*Status:\*\* *//' || echo "unknown"); \
		echo "  $$id — $$status"; \
	done || echo "  (none)"

# Archive a completed spec
spec-archive:
	@[ -n "$(id)" ] || { echo "Usage: make spec-archive id=<spec-id>"; exit 1; } \
	&& mv ".specs/changes/$$(date +%Y%m%d)$(id | sed 's/^/-/').md" ".specs/archive/" 2>/dev/null \
	|| mv .specs/changes/*$(id)*.md .specs/archive/ \
	&& echo "Archived: $(id)"
