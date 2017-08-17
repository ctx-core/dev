#!/bin/bash

nvm install
npm install
pushd ctx-core
git pull --rebase
popd
