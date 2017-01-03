#!/bin/bash
function ensure {
  PS="$(ps aux | grep $1 | grep -v grep)"
  if [ -z "$PS" ]; then
    echo "$1"
    exec $1
  fi
}
[ "$(basename $0)" = "ensure.sh" ] && ensure $1