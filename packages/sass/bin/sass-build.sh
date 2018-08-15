#!/bin/sh
# SEE https://github.com/sass/node-sass/issues/1579
# TODO: Use yarn when https://github.com/yarnpkg/yarn/issues/2069 is resolved
FILE=$(ls -1 $0 | sed -e 's/.* -> //')
DIR_BIN=$(dirname $FILE)
DIR_SASS="$DIR_BIN/.."
cd "$DIR_SASS"

npm rebuild node-sass
eval "$(sass-cmd.js $@ -- '&')"
wait