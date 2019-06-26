#!/bin/sh
build=$(which build-ts.js)
lerna exec --stream --parallel -- $build -d .; build-ts.js $@
