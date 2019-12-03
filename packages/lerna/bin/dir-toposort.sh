#!/bin/sh
lerna exec -- pwd | grep -v '^lerna '
