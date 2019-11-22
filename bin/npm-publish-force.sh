#!/bin/sh
DIR=$(pwd)
ls packages | awk -v DIR=$DIR '{print "cd "DIR"/packages/"$1" && npm publish"}' | sh
