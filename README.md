# Debt Graph Project

Tool for visualizing the debt implications of various modifications to the policy proposals of the 2016 presidential candidates. Calculates the debt reduction effect of various combinations of tax increases and spending cuts, using the plans of Trump and Clinton as baselines. Provides instant feedback to the user, allowing them to create their own plan for adapting the candidates' plans to better manage the debt.

## Build Instructions

* `make deploy` to build the calculators at `./dev/[clinton|trump].html`
* `make build` to transfer the calculators to the specified target directory (default: `./static/`)
    * edit the target by changing the `TARGET` variable in the top-level Makefile
* `make clean` to clean the repository of derived files

## Implementation Details

Uses `JQuery` and the Google Visualization API, along with basic `HTML/CSS`. Styled statically. Designed for iframe embedding in a CRFB blog along with supplementary description, disclaimers, and analysis.

## Modeling Information

Based on debt projections made by the Committee for a Responsible Federal Budget in June 2016, using data from the Congressional Budget Office and the Tax Policy Center. All results are heavily rounded and may not exactly match prior analyses.

---
Rick Dionne, July 2016