#!/bin/bash
for run in {1..20}
do
 gpio -g toggle 20
 sleep 1
done
gpio -g write 20 0
