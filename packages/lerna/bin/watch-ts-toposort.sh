#!/bin/sh
dir-toposort.sh | script-ts.js --watch --parallel 5 $@
