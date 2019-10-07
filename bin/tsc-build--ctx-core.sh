#!/bin/sh
ROOT_DIR=$(dirname $(dirname "$0"))
tsc -b $(ls $ROOT_DIR/packages/*/tsconfig.json | xargs dirname) $@
