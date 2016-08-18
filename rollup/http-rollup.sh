#!/bin/bash
# rollup http js to private/dist
for script in "$(ctx-core/bin/rollup-files.js -t http -- "&")"
do
  eval "$script"
done
wait