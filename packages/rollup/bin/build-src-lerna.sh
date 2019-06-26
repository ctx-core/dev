#!/bin/sh
build=$(which build-src.js)
lerna exec --stream  --parallel -- "$build --dir $(pwd)"; build-src.js $@
