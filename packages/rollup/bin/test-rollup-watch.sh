#!/bin/sh
# watch & rollup test js to private/dist
eval "$(rollup-cmd.js -t test --watch)"
