#!/bin/bash

# script for deploying Trump/Clinton debt calculators
# from generic template 'candidatecalc.html'
# produces 'trumpcalc.html' and 'clintoncalc.html'
# overwrites existing files

echo "deploying..."
sed 's/#CAND#/Clinton/g' calc.template > clintoncalc.html
echo "  built clintoncalc"
sed 's/#CAND#/Trump/g'   calc.template > trumpcalc.html
echo "  built trumpcalc"
echo "  ...done"
