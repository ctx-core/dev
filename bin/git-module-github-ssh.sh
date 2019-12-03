#!/bin/sh
sed -i.bak 's/https:\/\/github.com\//git@github.com:/g' .git/modules/packages/*/config
