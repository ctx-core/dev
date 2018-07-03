#!/bin/sh

nvm install
npm install
pushd ctx-core
git pull --rebase
popd
