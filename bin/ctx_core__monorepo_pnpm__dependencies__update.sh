#!/bin/sh
TEMP=$(mktemp)
monorepo_pnpm__dependencies__update -o "$TEMP"
UPDATES=$(cat "$TEMP" | grep -v '@ctx-core/dev ' | grep -Fv '. ')
echo "$UPDATES"
echo "$UPDATES" | package-manifest-changeset
