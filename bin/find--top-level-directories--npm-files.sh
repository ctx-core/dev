#!/bin/sh
: <<'COMMENT'
prints the CWD's top level subdirectories to be used in a package.json 'files' array
COMMENT
find . -maxdepth 1 -type d | grep -v node_modules | awk '{print "\""$1"\","}' | sort | grep -v '"."'
