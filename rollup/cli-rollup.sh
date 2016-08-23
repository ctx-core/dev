#!/bin/bash
# rollup cli js to public/dist
eval "$(ctx-core/bin/rollup-files.js -t cli -- "&")"
wait