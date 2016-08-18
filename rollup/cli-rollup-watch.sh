#!/bin/bash
# watch & rollup cli js to public/dist
for script in "$(ctx-core/bin/rollup-files.js -t cli -- "--watch &")"
do
  eval "$script"
done
wait