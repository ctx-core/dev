#!/usr/bin/env bash
# build jsdoc for project
jsdoc . -r -c ./.jsdoc.json -d ./private/docs $@