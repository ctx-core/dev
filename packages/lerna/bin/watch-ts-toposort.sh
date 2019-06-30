#!/bin/sh
lerna exec -- pwd | grep -v '^lerna ' | script-ts.js --watch --parallel 5 $@
