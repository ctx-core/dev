#!/bin/bash
curl -s 'https://api.cdnjs.com/libraries?search=webcomponentsjs&fields=version' \
  | jq '.results[0]' \
  > ctx-core/webcomponents-lite/cdnjs.json