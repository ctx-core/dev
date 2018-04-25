#!/bin/bash
function ensure {
	PS="$(ps aux | grep -- "$(echo $@)" | grep -v grep)"
	if [ -z "$PS" ]; then
		echo "$@"
		exec "$@"
	fi
}
[ "$(basename $0)" = "ensure.sh" ] && ensure $@