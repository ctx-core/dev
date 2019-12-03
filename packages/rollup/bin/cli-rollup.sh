#!/bin/sh
# rollup cli js to public/dist
eval "$(rollup-cmd.js -t cli -- '&')"
wait