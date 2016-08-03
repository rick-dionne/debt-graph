/* debt graph tool underlying projections
 * stored in separate file for ease of update
 * Rick Dionne, July 2016 
 */

/* global constants */
var g_base_gdp = [19297,20127.065,20905.973,21709.703,22593.17,23527.51,24497.155,25505.625,26559.2,27659.955];
var g_int_matrix = [
    [0.0112,0.0244,0.0295,0.0327,0.0348,0.0369,0.0390,0.0412,0.0435,0.0451],
    [0.0000,0.0117,0.0320,0.0342,0.0362,0.0379,0.0397,0.0415,0.0433,0.0453],
    [0.0000,0.0000,0.0185,0.0357,0.0371,0.0386,0.0401,0.0417,0.0433,0.0449],
    [0.0000,0.0000,0.0000,0.0176,0.0366,0.0379,0.0393,0.0407,0.0422,0.0437],
    [0.0000,0.0000,0.0000,0.0000,0.0179,0.0367,0.0380,0.0394,0.0408,0.0423],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0173,0.0367,0.0380,0.0394,0.0408],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0176,0.0367,0.0380,0.0394],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0176,0.0367,0.0380],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0176,0.0367],
    [0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0176]
];
var g_curr_totrev   = 42089.371;
var g_curr_totspend = 45571.247;

/* Spending Cut Exclusions (src: CBO March 2016) */
var g_soc_sec_cost = [946.669,1002.838,1066.803,1134.920,1206.454,1281.523,1360.085,1442.042,1529.003,1619.845];
var g_medicare_cost = [594.145,593.523,660.058,708.705,759.211,853.058,877.22,894.117,997.412,1074.581];

/* Trump Plan */
var g_base_tax = [9.508,12.453,13.462,14.471,14.935,15.944,16.953,17.417,18.205,19.021];
var g_base_taxfull = [48.721,67.041,72.159,76.201,79.856,82.936,87.236,91.537,95.837,100.134];
var g_base_spend = [3751.783,3828.567,4044.495,4227.65,4415.026,4677.17,4830.515,4980.614,5269.258,5546.169];
var g_base_debt = [15140.464,16593.902,18304.645,20178.356,22215.212,24492.051,26895.069,29415.980,32174.036,35192.415];
/* intentioanlly empty - Trump tax is fully linear */
var g_tax_fixers = [];
var g_tax_scalars = [];
/* for results */
var g_cand_totrev   = 31598.095;
var g_cand_totspend = 44915.862;

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
var g_custom_max     = 1.27;
var g_custom_default = 0.66;

/* for results display */
var g_line_color = 'red';
var g_cand_name = 'Trump';
var g_base_toptax = 25;
