#!/bin/bash

# script for deploying Trump/Clinton debt calculators
# from generic template 'candidatecalc.html'
# produces 'trumpcalc.html' and 'clintoncalc.html'
# overwrites existing files

echo "deploying..."
sed -e 's/#CANDT#/Clinton/g' \
    -e 's/#CANDF#/clinton/g' \
    -e 's/#TMIN#/44/g' calc.template > clinton.html
echo "  built clinton"
sed -e 's/#CANDT#/Trump/g' \
    -e 's/#CANDF#/trump/g' \
    -e 's/#TMIN#/25/g' calc.template > trump.html
echo "  built trump"
echo "  ...done"
