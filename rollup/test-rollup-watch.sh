#!/bin/sh
# watch & rollup test js to private/dist
eval "$(ctx-core/bin/rollup-cmd.js -t test --watch)"
