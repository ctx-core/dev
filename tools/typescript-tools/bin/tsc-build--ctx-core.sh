#!/bin/sh
PKG_DIR=$(dirname $(dirname "$0"))
ROOT_DIR=$(dirname $(dirname $(dirname $(dirname "$0"))))
$PKG_DIR/node_modules/.bin/tsc -b \
  $(ls $ROOT_DIR/packages/*/tsconfig.json | xargs dirname) \
  $(ls $ROOT_DIR/tools/*/tsconfig.json | xargs dirname) \
  $@
