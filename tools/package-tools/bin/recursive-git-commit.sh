#!/bin/sh
TEMP=$(mktemp); cat <<'EOF' > $TEMP; vim $TEMP; pnpm recursive exec --workspace-concurrency 1 -- sh "$TEMP"
DEFAULT_MSG=''
git add .
if [ -f COMMIT_EDITMSG ]; then
  git commit -a -F COMMIT_EDITMSG && rm COMMIT_EDITMSG
else
  git commit -am "$DEFAULT_MSG"
fi||echo ''
EOF
