/* debt graph tool underlying projections
 * stored in separate file for ease of update
 * Rick Dionne, July 2016 
 * Updated by Rick Dionne, October 2016
 */

/* Trump Plan */
var g_base_tax = [8.905,11.869,12.882,13.895,14.364,15.377,16.39,16.859,17.651,18.472];
var g_base_taxfull = [50.825,70.223,75.642,79.922,83.793,91.607,93.883,96.16,98.437,100.713];
var g_base_spend = [3744.857,3818.22,4020.28,4209.09,4397.45,4659.17,4810.87,4962,5246.62,5522.95];
var g_base_debt = [15019.22,16071.43,17259.39,18544.88,19921.24,21451.16,23038.59,24665.29,26446.97,28398.07];
/* intentionally empty - Trump tax is fully linear */
var g_tax_fixers = [];
var g_tax_scalars = [];
/* for results */
var g_cand_totrev   = 35872.703;
var g_cand_totspend = 44200.722;

/* slider ranges */
var g_scale_factor     =    10;
var g_spending_min     =    0 * g_scale_factor;
var g_spending_max     =  100 * g_scale_factor;
var g_spending_default =    0 * g_scale_factor;
var g_tax_min          =    0 * g_scale_factor;
var g_tax_max          =   32 * g_scale_factor;
var g_tax_default      =    0 * g_scale_factor;

/* fixed target bounds */
var g_custom_min     = 0.50;
var g_custom_max     = 1.05;
var g_custom_default = 0.67;

/* for results display */
var g_line_color = '#bb3224';
var g_cand_name = 'Trump';
var g_base_toptax = 33;
