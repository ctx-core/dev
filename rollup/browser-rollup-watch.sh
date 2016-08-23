#!/bin/bash
# watch & rollup browser js to public/dist
eval "$(ctx-core/bin/rollup-files.js -t browser -- "--watch &")"
wait