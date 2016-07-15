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
//var g_medicare_cost = [539.873,591.213,594.145,593.523,660.058,708.705,759.211,853.058,877.220,894.117,997.412,1074.581];
var g_medicare_cost = [701.835,768.577,772.389,771.58,858.075,921.317,986.974,1108.975,1140.386,1162.352];

/* Clinton Plan */
var g_base_taxfull = [48.721,67.041,72.159,76.201,79.856,82.936,87.236,91.537,95.837,100.134];
var g_base_taxrich = [13.277,13.531,14.7998,16.086,16.349,17.675,19.022,19.343,20.331,21.362];
//var g_base_spend = [3832.137,3948.203,4183.969,4371.387,4563.402,4831.007,4985.575,5140.118,5430.707,5705.846];
var g_base_spend = [3755.494,3869.239,4100.29,4283.959,4472.134,4734.387,4885.864,5037.316,5322.093,5591.729];
var g_base_debt = [14612.990,15265.744,16057.968,16921.152,17870.603,18967.800,20097.029,21245.033,22530.538,23928.643];

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
