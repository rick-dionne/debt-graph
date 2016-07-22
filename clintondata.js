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

/* Spending Cut Exclusions (src: CBO March 2016) */
var g_soc_sec_cost = [946.669,1002.838,1066.803,1134.920,1206.454,1281.523,1360.085,1442.042,1529.003,1619.845];
var g_medicare_cost = [594.145,593.523,660.058,708.705,759.211,853.058,877.22,894.117,997.412,1074.581];

/* Clinton Plan */
var g_base_tax = [7.379,10.298,11.298,12.298,12.758,13.758,14.758,15.217,15.998,16.807];
var g_base_taxfull = [48.721,67.041,72.159,76.201,79.856,82.936,87.236,91.537,95.837,100.134];
var g_base_spend = [3751.783,3828.567,4044.495,4227.65,4415.026,4677.17,4830.515,4980.614,5269.258,5546.169];
var g_base_debt = [14612.990,15265.744,16057.968,16921.152,17870.603,18967.800,20097.029,21245.033,22530.538,23928.643];
var g_tax_fixers = [
    [0.003334,0.005556,0.005556,0.005556,0.006667,0.006667,0.006667,0.007778,0.008192,0.008596],
    [0.009122,0.012162,0.013682,0.015203,0.015203,0.016723,0.018243,0.018243,0.019169,0.020146],
    [0.002633,0.003510,0.003949,0.004388,0.004388,0.004827,0.005266,0.005266,0.005533,0.005815]
];
var g_tax_scalars = [5.0,11.6,15.6];

/* slider ranges */
var g_scale_factor     =    2;
var g_spending_min     =    0 * g_scale_factor;
var g_spending_max     =  100 * g_scale_factor;
var g_spending_default =    0 * g_scale_factor;
var g_tax_min          =   44 * g_scale_factor;
var g_tax_max          =   65 * g_scale_factor;
var g_tax_default      =   44 * g_scale_factor;

/* fixed target bounds */
var g_custom_min     = 0.25;
var g_custom_max     = 0.87;
var g_custom_default = 0.67;

/* chart styling */
var g_line_color = 'blue';
var g_cand_name = 'Clinton';
