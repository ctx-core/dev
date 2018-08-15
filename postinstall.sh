#!/bin/sh
echo 'postinstall.sh'
echo "Environment: $NODE_ENV"

DIR="$(pwd)"
cd node_modules/.bin
DIR__BIN="$(pwd)"
for f in $(find $DIR/*/bin/*); do
	ln -sf "$(realpath --relative-to="$DIR__BIN" "$f")"
done
for f in $(find $DIR/bin/*); do
	ln -sf "$(realpath --relative-to="$DIR__BIN" "$f")"
done
cd $DIR

echo $POSTINSTALL
[ -z "$POSTINSTALL" ] || "$POSTINSTALL"