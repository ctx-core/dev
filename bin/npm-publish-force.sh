#!/bin/sh
DIR=pwd
ls packages | awk '{print "cd $DIR/packages/ctx-core/packages/"$1" && npm publish"}' | sh
