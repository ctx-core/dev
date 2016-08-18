#!/bin/bash
# watch & rollup http js to private/dist
for script in "$(ctx-core/bin/rollup-files.js -t http -- "--watch &")"
do
  eval "$script"
done
wait