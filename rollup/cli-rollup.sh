#!/bin/bash
# rollup cli js to public/dist
for script in "$(ctx-core/bin/rollup-files.js -t cli -- "&")"
do
  eval "$script"
done
wait