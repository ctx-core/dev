#!/bin/bash
# rollup browser js to public/dist
for script in "$(ctx-core/bin/rollup-files.js -t browser -- "&")"
do
  eval "$script"
done
wait