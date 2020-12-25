#!/bin/sh
timesheet $@ |
  awk -F';' '{print $NF}' |
  paste -sd+ |
  bc
