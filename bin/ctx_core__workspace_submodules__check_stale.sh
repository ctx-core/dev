#!/bin/sh
# Fetch every pnpm-workspace submodule and fast-forward any that are behind.
#
# The dependency sweep computes updates from whatever each submodule checkout
# happens to be. On a stale checkout it does not merely "fail to update" — it
# REVERTS the newer upstream manifest back to the older one it can see. This
# guard exists so that never happens silently.
#
# Fast-forwarding is the DEFAULT: these submodules are consumed, not developed
# in, so a behind checkout is a sync problem to fix rather than a decision to
# put to the operator. A DIVERGED submodule has local commits upstream does not,
# so it is never rewritten — it is reported and the sweep refuses.
#
# Usage:
#   ctx_core__workspace_submodules__check_stale.sh [--check-only] [--jobs N] [--quiet]
#
#   --check-only   report without fast-forwarding (alias: --no-rebase)
#   --rebase       explicit form of the default
#
# Exit 0 when every workspace submodule ends at or ahead of its upstream.
# Exit 1 when any could not be fast-forwarded (diverged, or the merge failed).
set -eu

# --- worker mode -------------------------------------------------------------
# `sh` cannot export shell functions, so the parallel fan-out re-execs this
# script once per submodule. Handled first, before normal argument parsing.

check_one() {
	path=$1
	[ -e "$path/.git" ] || { echo "error $path not-initialized"; return 0; }

	if ! git -C "$path" fetch --quiet origin 2>/dev/null; then
		echo "error $path fetch-failed"
		return 0
	fi

	upstream=$(git -C "$path" symbolic-ref --quiet refs/remotes/origin/HEAD 2>/dev/null || true)
	if [ -z "$upstream" ]; then
		git -C "$path" remote set-head origin --auto >/dev/null 2>&1 || true
		upstream=$(git -C "$path" symbolic-ref --quiet refs/remotes/origin/HEAD 2>/dev/null || true)
	fi
	if [ -z "$upstream" ]; then
		for candidate in refs/remotes/origin/main refs/remotes/origin/master; do
			if git -C "$path" rev-parse --verify --quiet "$candidate" >/dev/null 2>&1; then
				upstream=$candidate
				break
			fi
		done
	fi
	[ -n "$upstream" ] || { echo "no-upstream $path -"; return 0; }

	head=$(git -C "$path" rev-parse HEAD)
	target=$(git -C "$path" rev-parse "$upstream")
	short=${upstream#refs/remotes/}

	if [ "$head" = "$target" ]; then
		echo "equal $path $short"
		return 0
	fi

	behind=$(git -C "$path" rev-list --count "$head..$target")
	ahead=$(git -C "$path" rev-list --count "$target..$head")
	if [ "$behind" -gt 0 ] && [ "$ahead" -eq 0 ]; then
		echo "behind $path $short:$behind"
	elif [ "$ahead" -gt 0 ] && [ "$behind" -eq 0 ]; then
		echo "ahead $path $short:$ahead"
	else
		echo "diverged $path $short:+$ahead/-$behind"
	fi
}

if [ "${1:-}" = "--check-one" ]; then
	check_one "$2"
	exit 0
fi

# --- arguments ---------------------------------------------------------------

JOBS=12
REBASE=1
QUIET=0
AFTER_REBASE=0

while [ $# -gt 0 ]; do
	case "$1" in
		--rebase) REBASE=1 ;;
		--check-only|--no-rebase) REBASE=0 ;;
		--after-rebase) REBASE=0; AFTER_REBASE=1 ;;
		--quiet) QUIET=1 ;;
		--jobs) shift; JOBS="${1:?--jobs needs a value}" ;;
		--jobs=*) JOBS="${1#--jobs=}" ;;
		-h|--help) sed -n '2,21p' "$0" | sed 's/^#\{1,\} \{0,1\}//'; exit 0 ;;
		*) echo "unknown argument: $1" >&2; exit 2 ;;
	esac
	shift
done

SELF=$(cd "$(dirname "$0")" && pwd)/$(basename "$0")
ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

# Workspace packages only (pnpm-workspace.yaml: lib/*, tools/*, vendor/*).
# dormant/* is deliberately excluded — it is not part of the sweep.
paths=$(git config -f .gitmodules --get-regexp '^submodule\..*\.path$' \
	| awk '{ print $2 }' \
	| grep -E '^(lib|tools|vendor)/' \
	| sort)

count=$(printf '%s\n' "$paths" | grep -c . || true)
[ "$QUIET" -eq 1 ] || echo "checking $count workspace submodule(s) against upstream (jobs=$JOBS)..." >&2

results=$(mktemp)
trap 'rm -f "$results"' EXIT

printf '%s\n' "$paths" | grep . \
	| xargs -P "$JOBS" -I{} "$SELF" --check-one {} \
	| sort > "$results"

stale=$(awk '$1 == "behind" || $1 == "diverged"' "$results")
broken=$(awk '$1 == "error" || $1 == "no-upstream"' "$results")

if [ -n "$broken" ] && [ "$QUIET" -eq 0 ]; then
	echo "" >&2
	echo "not checked (no upstream comparison possible):" >&2
	printf '%s\n' "$broken" | awk '{ printf "  %-44s %s %s\n", $2, $1, $3 }' >&2
fi

if [ -z "$stale" ]; then
	[ "$QUIET" -eq 1 ] || echo "all workspace submodules are at or ahead of upstream" >&2
	exit 0
fi

if [ "$REBASE" -eq 1 ]; then
	echo "" >&2
	echo "fast-forwarding stale submodules:" >&2
	# Fast-forward only. A diverged submodule is never rewritten.
	printf '%s\n' "$stale" | while read -r status path detail; do
		upstream="refs/remotes/${detail%%:*}"
		if [ "$status" = "diverged" ]; then
			echo "  SKIP     $path (${detail#*:}) — resolve by hand" >&2
			continue
		fi
		if branch=$(git -C "$path" symbolic-ref --quiet --short HEAD 2>/dev/null) && [ -n "$branch" ]; then
			ok=$(git -C "$path" merge --ff-only "$upstream" >/dev/null 2>&1 && echo 1 || echo 0)
		else
			ok=$(git -C "$path" checkout --quiet --detach "$upstream" >/dev/null 2>&1 && echo 1 || echo 0)
		fi
		if [ "$ok" = "1" ]; then
			echo "  updated  $path -> ${detail%%:*}" >&2
		else
			echo "  FAILED   $path" >&2
		fi
	done
	# Re-check rather than trusting the loop's exit status (it runs in a subshell).
	# --check-only on the re-exec: whatever did not fast-forward must now refuse,
	# not loop back into another rebase attempt.
	echo "" >&2
	exec "$SELF" --jobs "$JOBS" --after-rebase
fi

echo "" >&2
echo "REFUSING TO SWEEP: workspace submodule(s) are not at their upstream." >&2
echo "A sweep from a stale checkout REVERTS newer upstream manifests instead of updating them." >&2
if [ "$AFTER_REBASE" -eq 1 ]; then
	echo "These could not be fast-forwarded automatically:" >&2
else
	echo "(--check-only: no fast-forward was attempted)" >&2
fi
echo "" >&2
printf '%s\n' "$stale" | awk '{ printf "  %-44s %s %s\n", $2, $1, $3 }' >&2
echo "" >&2
echo "A diverged submodule has local commits upstream does not — resolve it by hand" >&2
echo "(rebase or push), or override:" >&2
echo "  CTX_CORE_ALLOW_STALE_SUBMODULES=1 <sweep command>   # sweeps anyway, at your own risk" >&2
exit 1
