#!/bin/sh
# rollup test js to private/dist
eval "$(rollup-cmd.js -t test -- '&')"
wait