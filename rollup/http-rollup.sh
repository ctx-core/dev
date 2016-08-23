#!/bin/bash
# rollup http js to private/dist
eval "$(ctx-core/bin/rollup-files.js -t http -- "&")"
wait