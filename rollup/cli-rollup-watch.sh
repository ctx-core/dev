#!/bin/bash
# watch & rollup cli js to public/dist
eval "$(ctx-core/bin/rollup-files.js -t cli -- "--watch &")"
wait