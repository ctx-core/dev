#!/bin/sh
nodemon -e css,scss,sass --watch . --ignore public/dist --ignore private/dist --exec sass-build.sh