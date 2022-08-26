#!/bin/sh
build --watch --ignore '**/node_modules/**' --op-threads 8 --sync-threads 4 $@
