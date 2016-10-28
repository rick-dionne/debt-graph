/* debt graph tool underlying projections
 * stored in separate file for ease of update
 * Rick Dionne, July 2016 
 * Updated by Rick Dionne, October 2016
 */

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
var g_custom_default = 0.67;

/* chart styling */
var g_line_color = '#41479d';
var g_cand_name = 'Clinton';
var g_base_toptax = 44;
