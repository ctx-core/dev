#!/bin/sh
POSITIONAL=()
while [[ $# -gt 0 ]]
do
	key="$1"
	case $key in
			-d|--dir)
			DIR="$2"
			shift # past argument
			shift # past value
			;;
			-e|--envname)
			ENVNAME="$2"
			shift # past argument
			shift # past value
			;;
			*)    # unknown option
			POSITIONAL+=("$1") # save it in an array for later
			shift # past argument
			;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters
DIR=${DIR:-"./packages/web"}
ENVNAME=${ENVNAME:-production}
rm -rf $DIR/node_modules/*
pushd $DIR
npm i
up deploy $ENVNAME
popd
rm -rf $DIR/node_modules/*