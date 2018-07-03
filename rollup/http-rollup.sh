#!/bin/sh
# rollup http js to private/dist
eval "$(ctx-core/bin/rollup-cmd.js -t http $@ -- '&')"
wait