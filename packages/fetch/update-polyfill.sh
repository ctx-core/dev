#!/bin/sh
echo "$0"
curl -s 'https://api.cdnjs.com/libraries?search=fetch&fields=version' \
	| jq '.results[0]' \
	> ./packages/ctx-core/packages/fetch/cdnjs.json