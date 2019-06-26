#!/bin/sh
lerna exec -- pwd | grep -v '^lerna ' | script-ts.js --compile
