#!/bin/sh
# watch & minify browser js build files in public/dist
for input in $(find public/dist -name '*.js' | grep -v .map.js | grep -v .min.js)
do
	nodemon --exec "ctx-core/bin/browser-min-uglify.sh" --watch "$input" &
done
wait