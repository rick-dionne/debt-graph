/* debt graph tool underlying projections
 * stored in separate file for ease of update
 * Rick Dionne, July 2016 
 * Updated by Rick Dionne, October 2016
 */

/* global constants */
var g_base_gdp = [19101.86,19894.565,20636.71,21371.913,22193.068,23074.683,24000.8,24967.35,25976.928,27027.033];
var g_int_matrix = [
    [0.0064,0.0117,0.0187,0.0247,0.0280,0.0301,0.0317,0.0332,0.0344,0.0361],
    [0.0065,0.0136,0.0177,0.0223,0.0253,0.0276,0.0301,0.0323,0.0346,0.0359],
    [0.0000,0.0083,0.0204,0.0240,0.0270,0.0290,0.0309,0.0328,0.0347,0.0366],
    [0.0000,0.0000,0.0131,0.0261,0.0283,0.0303,0.0318,0.0333,0.0349,0.0366],
    [0.0000,0.0000,0.0000,0.0147,0.0297,0.0310,0.0325,0.0337,0.0351,0.0364],
    [0.0000,0.0000,0.0000,0.0000,0.0166,0.0314,0.0325,0.0337,0.0349,0.0361],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0164,0.0320,0.0330,0.0342,0.0353],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0169,0.0322,0.0333,0.0343],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0169,0.0323,0.0333],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0169,0.0323],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0169]
];
var g_curr_totrev   = 41658.000;
var g_curr_totspend = 45391.516;

/* Spending Cut Exclusions (src: CBO August 2016) */
var g_soc_sec_cost = [944.442,999.171,1061.417,1128.338,1199.330,1273.840,1352.207,1433.976,1519.554,1608.665];
var g_medicare_cost = [707.941,715.773,790.077,848.103,909.907,1016.854,1048.415,1076.411,1193.705,1288.773];

/* Trump Plan */
var g_base_tax = [9.518,12.47,13.479,14.488,14.955,15.964,16.974,17.441,18.229,19.047];
var g_base_taxfull = [50.629,69.95,75.347,79.61,83.465,91.248,93.516,95.783,98.051,100.319];
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
var g_tax_max          =   40 * g_scale_factor;
var g_tax_default      =    0 * g_scale_factor;

/* fixed target bounds */
var g_custom_min     = 0.50;
var g_custom_max     = 1.05;
var g_custom_default = 0.66;

/* for results display */
var g_line_color = '#bb3224';
var g_cand_name = 'Trump';
var g_base_toptax = 25;
