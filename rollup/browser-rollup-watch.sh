#!/bin/bash
# watch & rollup browser js to public/dist
eval "$(ctx-core/bin/rollup-cmd.js -t browser --watch)"