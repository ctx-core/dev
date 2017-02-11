#!/bin/bash
echo "$0"
curl -s 'https://api.cdnjs.com/libraries?search=fetch&fields=version' \
  | jq '.results[0]' \
  > ctx-core/fetch/cdnjs.json