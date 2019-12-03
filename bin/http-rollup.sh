#!/bin/sh
# rollup http js to private/dist
eval "$(rollup-cmd.js -t http $@ -- '&')"
wait