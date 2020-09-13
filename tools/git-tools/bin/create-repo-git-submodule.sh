#!/bin/sh
NAME=$1
curl -H "Authorization: bearer $GITHUB_SECRET" https://api.github.com/orgs/ctx-core/repos -d "{\"name\": \"$NAME\"}"
mv "packages/$NAME" "packages/$NAME"_
pushd "packages/$NAME"_
git init .
git add .
git commit -m 'new repo'
git remote add origin "git@github.com:ctx-core/$NAME.git"
git push -u origin master
popd
rm -rf "packages/$NAME"_
git add .
git submodule add "https://github.com/ctx-core/$NAME" "packages/$NAME"
git commit -m "@ctx-core/$NAME: git submodule"
