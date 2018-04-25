#!/usr/bin/env bash
# jsdoc cli that builds when ENTER is pressed
while true; do
	read -p "Press ENTER to build jsdoc..." input
	if [[ -z $input ]]; then
		. ./bin/jsdoc.sh --verbose
	fi
done