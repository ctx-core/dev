#!/bin/sh
DEV_DIR_DEFAULT=~/work/ctx-core/ctx-core
DEV_DIR="${DEV_DIR:-$DEV_DIR_DEFAULT}"

cd $DEV_DIR
tmux-rename-window
tmux split-window -h $SHELL
tmux split-window -v $SHELL
tmux send-keys 'tig' 'C-m'
tmux select-pane -t 0
tmux split-window -v $SHELL
tmux select-pane -t 0

tmux rename-window censible
tmux select-layout tiled
tmux move-window -t 0
tmux select-pane -t 1
tmux select-window -t 0
