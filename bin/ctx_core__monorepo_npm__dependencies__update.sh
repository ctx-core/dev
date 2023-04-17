#!/bin/sh
DIR="$(dirname $0)"
TEMP=$(mktemp)
monorepo_npm__dependencies__update -o $TEMP
UPDATES=$(cat "$TEMP" | grep -v '@ctx-core/ctx-core ' | grep -Fv '. ')
echo "$UPDATES"
echo "$UPDATES" | package-manifest-changeset
