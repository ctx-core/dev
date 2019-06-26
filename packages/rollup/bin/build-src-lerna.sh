#!/bin/sh
build=$(which build-src.js)
lerna exec --stream -- "$build --dir $(pwd)"; build-src.js $@
