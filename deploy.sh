#!/bin/bash

# script for deploying Trump/Clinton debt calculators
# from generic template 'dev/calc.template'
# produces 'dev/trump.html' and 'dev/clinton.html'
# overwrites existing files
#
# Rick Dionne, July 2016
# Updated August 2016

echo "deploying..."
sed -e 's/#CANDT#/Clinton/g' \
    -e 's/#CANDF#/clinton/g' \
    -e 's/#TMIN#/44/g' dev/calc.template > dev/clinton.html
echo "  built clinton"
sed -e 's/#CANDT#/Trump/g' \
    -e 's/#CANDF#/trump/g' \
    -e 's/#TMIN#/33/g' dev/calc.template > dev/trump.html
echo "  built trump"
echo "...done"
