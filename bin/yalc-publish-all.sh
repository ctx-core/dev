#!/bin/sh
# Publish all workspace packages to yalc local store.
# Skips lifecycle scripts (prepublishOnly etc.) — assumes packages are already built.
#
# Usage:
#   yalc-publish-all.sh          # publish + push to consumers (default)
#   yalc-publish-all.sh --no-push   # publish only, don't push

PUSH_FLAG="${1:---push}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

for pattern in $(node -e "
  const pkg = JSON.parse(require('fs').readFileSync('$ROOT/package.json', 'utf-8'));
  console.log((pkg.workspaces || []).join('\n'));
"); do
  for dir in $ROOT/$pattern; do
    if [ -f "$dir/package.json" ]; then
      name="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$dir/package.json','utf-8')).name||'')")"
      private="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$dir/package.json','utf-8')).private||false)")"
      if [ -n "$name" ] && [ "$private" != "true" ]; then
        echo "yalc publish --no-scripts $PUSH_FLAG $name"
        (cd "$dir" && yalc publish --no-scripts $PUSH_FLAG) || echo "  FAILED: $name"
      fi
    fi
  done
done
