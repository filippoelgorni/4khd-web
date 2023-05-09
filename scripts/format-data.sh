#!/bin/sh

for f in ./../public/data/*.csv; do sed -i ''  '1d' $f; done
for f in ./../public/data/*.csv; do sed -i ''  '1d' $f; done
for f in ./../public/data/*.csv; do awk 'NR == 1 || NR % 300 == 0' $f > testfile.tmp && mv testfile.tmp $f ; done