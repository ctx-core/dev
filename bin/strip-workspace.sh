#!/bin/sh
sort-packages-exec -- \
	pwd \
	| awk -v q="'" '{print "cd "$1" && sed -i "q"s/workspace://g"q" package.json"}' \
	| sh
