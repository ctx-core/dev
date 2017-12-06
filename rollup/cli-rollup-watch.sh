#!/bin/bash
# watch & rollup cli js to public/dist
eval "$(ctx-core/bin/rollup-cmd.js -t cli --watch)"