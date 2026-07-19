#!/bin/sh
set -eu

BIN=$(cd "$(dirname "$0")" && pwd)

# A sweep reads each workspace submodule's manifest as it is on disk. From a
# stale checkout that does not merely under-update — it REVERTS newer upstream
# work back to the older manifest it can see. Refuse to run until every
# workspace submodule is at or ahead of its upstream.
if [ "${CTX_CORE_ALLOW_STALE_SUBMODULES:-0}" != "1" ]; then
	"$BIN/ctx_core__workspace_submodules__check_stale.sh" || exit 1
fi

TEMP=$(mktemp)
trap 'rm -f "$TEMP"' EXIT

monorepo_pnpm__dependencies__update -o "$TEMP"
UPDATES=$(grep -v '@ctx-core/dev ' "$TEMP" | grep -Fv '. ')
echo "$UPDATES"
echo "$UPDATES" | package-manifest-changeset
