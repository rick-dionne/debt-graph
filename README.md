# Debt Graph Project

This is an interactive tool for visualizing debt projections under various plans for revenue and spending. Intended for embedding in blogs or other informational pages, the tool allows the user to set their own levels of spending and revenue, starting from the plans of Presidential Candidates Trump and Clinton, as well as current law.

v2: Projections for the two candidates are now done separately, in parallel documents that load different datasets into the same underlying projection engine.

## Implementation Details

Uses `JQuery` and the Google Visualization API, along with basic `HTML` and `CSS`. Styled statically. Designed for iframe embedding in a CRFB blog along with supplementary description, disclaimers, and analysis.

## Modeling Information

Dynamic projection model developed from debt projections by the Committee for a Responsible Federal Budget. Economic feedback and other dynamic effects of debt are not incorporated. Projections for Social Security and Medicare spending are from the Congressional Budget Office's March 2016 baseline. Tax revenue projections are modified from a March 2016 Tax Policy Center analysis of Senator Sanders's plans.

---
Rick Dionne, July 2016