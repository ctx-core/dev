#!/bin/sh
usage() { echo "Usage: $0 [-l] [-h]" 1>&2; exit 1; }
while getopts ":l:h:" o; do
	case "${o}" in
		l)
			l=true
			;;
		h)
			usage
			exit
			;;
	esac
done
shift $((OPTIND-1))
if [ -z $(git submodule | awk '{print $2}' | grep ctx-core) ]; then
	git submodule add https://github.com/ctx-core/ctx-core.git packages/ctx-core
fi
if [ -z "${l}" ]; then
	cp -f ./packages/ctx-core/git__ctx-core/config .git/modules/packages/ctx-core/config
else
	wget https://raw.githubusercontent.com/ctx-core/ctx-core/git__ctx-core/config --output-file .git/modules/packages/ctx-core/config
fi
