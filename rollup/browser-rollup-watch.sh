#!/bin/bash
# watch & rollup browser js to public/dist
for script in "$(ctx-core/bin/rollup-files.js -t browser -- "--watch &")"
do
  eval "$script"
done
wait