#!/bin/sh
# SEE https://github.com/sass/node-sass/issues/1579
# TODO: Use yarn when https://github.com/yarnpkg/yarn/issues/2069 is resolved
npm rebuild node-sass
eval "$(sass-cmd.js $@ -- '&')"
wait