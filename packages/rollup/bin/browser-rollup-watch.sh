#!/bin/sh
# watch & rollup browser js to public/dist
eval "$(rollup-cmd.js -t browser --watch)"