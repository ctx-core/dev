#!/bin/sh
# rollup browser js to public/dist
eval "$(rollup-cmd.js -t browser $@ -- '&')"
wait