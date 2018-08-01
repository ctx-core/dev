#!/bin/sh
# rollup cli js to public/dist
eval "$(ctx-core/bin/rollup-cmd.js -t cli -- '&')"
wait