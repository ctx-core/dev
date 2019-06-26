#!/bin/sh
build=$(which build-ts.js)
lerna exec --stream -- $build -d .; build-ts.js $@
