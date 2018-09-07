#!/bin/sh
# SEE https://github.com/sass/node-sass/issues/1579
# TODO: Use yarn when https://github.com/yarnpkg/yarn/issues/2069 is resolved
npm rebuild node-sass
CMD__SASS="$(sass-cmd.js $@ -- '&')"
echo "$CMD__SASS"
eval "$CMD__SASS"
eval "$(sass-cmd.js $@ -- '&')"
wait