#!/bin/sh
Dir=$1
PATHS=$(cd $Dir/src && find . | grep -e \.svelte -e \.scss)
echo $Dir
mkdir -p $Dir/dist
rm -f $Dir/dist/**/*.svelte
rm -f $Dir/dist/**/*.scss
for path in $PATHS; do
	ln -sf $Dir/src/$path $Dir/dist/$path
	(cd $Dir && git add -f dist/$path)
done
