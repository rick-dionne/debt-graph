/* debt graph tool underlying projections
 * stored in separate file for ease of update
 * Rick Dionne, July 2016 
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

/* Clinton Plan */
var g_base_tax = [7.389,10.315,11.315,12.315,12.778,13.778,14.778,15.241,16.022,16.833];
var g_base_taxfull = [49.318,68.682,74.091,78.364,82.227,85.482,90.027,94.573,99.118,103.664];
var g_base_spend = [3834.355,3952.65,4178.31,4376.04,4570.51,4839.06,4993.14,5150.92,5440.54,5717.07];
var g_base_debt = [14774.065,15400.81,16107.84,16890.18,17757.09,18764.24,19796.18,20843.16,22020.23,23299.62];
var g_tax_fixers = [
    [0.003209,0.005348,0.005348,0.005348,0.006417,0.006417,0.006417,0.007487,0.007885,0.008274],
    [0.008088,0.010785,0.012133,0.013481,0.013481,0.014829,0.016177,0.016177,0.016998,0.017864],
   [0.002224,0.002965,0.003335,0.003706,0.003706,0.004077,0.004447,0.004447,0.004673,0.004911]
];
var g_tax_scalars = [5.0,11.6,15.6];
/* for results */
var g_cand_totrev   = 43173.662;
var g_cand_totspend = 47052.6;

/* slider ranges */
var g_scale_factor     =    10;
var g_spending_min     =    0 * g_scale_factor;
var g_spending_max     =  100 * g_scale_factor;
var g_spending_default =    0 * g_scale_factor;
var g_tax_min          =    0 * g_scale_factor;
var g_tax_max          =   21 * g_scale_factor;
var g_tax_default      =    0 * g_scale_factor;

/* fixed target bounds */
var g_custom_min     = 0.50;
var g_custom_max     = 0.86;
var g_custom_default = 0.66;

/* chart styling */
var g_line_color = '#41479d';
var g_cand_name = 'Clinton';
var g_base_toptax = 44;
