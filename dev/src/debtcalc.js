/* crfb debt graph interactive tool
 *
 * displays an interactive single plan debt calculator
 * relies on datafile - trumpdata.js or clintondata.js
 * one of those scripts MUST be included before this one
 * to set global variables and load underlying datasets
 * October 2016: also relies on gdata.js
 *
 * Rick Dionne, July 2016
 * Updated by Rick Dionne, October 2016
 */

/* copy global vars */
my_base_spend  =    g_base_spend;
my_base_debt   =     g_base_debt;

/* prevent recursive loop */
var updating = false;

/* fixed target mode */
var g_target_fixed = true;
var g_target_value = 0;
var g_spend_factor = 0;
var g_tax_quadfact = 0;
var g_tax_linfact  = 0;
var g_stable_target = 0.766;
var g_custom_target = g_custom_default;
var g_balance_target = 0.567;


/* chart loaded flag */
var g_chart_loaded = false;

/* load charts and initialize inputs */
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(chartLoaded);

/* initialize input elements */
function chartLoaded() {
    // initialize sliders
    $('#spending_slider').slider({
	orientation: 'vertical',
	range: 'min',
	min: g_spending_min,
	max: g_spending_max,
	value: g_spending_default,
	change: function(event, ui) {
	    slideUpdateFunc('spending','tax', solveForTax, solveForSpend);
	},
	slide: function(event, ui) {
	    slideUpdateFunc('spending','tax', solveForTax, solveForSpend);
	}
    });
    $('#tax_slider').slider({
	orientation: 'vertical',
	range: 'min',
	min: g_tax_min,
	max: g_tax_max,
	value: g_tax_default,
	change: function(event, ui) {
	    slideUpdateFunc('tax','spending', solveForSpend, solveForTax);
	},
	slide: function(event, ui) {
	    slideUpdateFunc('tax','spending', solveForSpend, solveForTax);
	}
    });

    // initialize text inputs
    $('#spending_in').change(function() {
	textUpdateFunc('spending', g_spending_min, g_spending_max);
    });
    $('#tax_in').change(function() {
	textUpdateFunc('tax', g_tax_min, g_tax_max);
    });

    // initialize target selection checkboxes
    $('input[type=radio][name=target]').change(function() {
	setTarget(this.value);
    });

    // initialize custom target input
    $('#custom_target').change(function() {
	customHandler();
    });

    // initialize exclusion checkboxes
    $('.exclude input[type=checkbox]').change(function() {
	updateBaseSettings();
	mainCalculate();
    });

    $('input[type=radio][name=tax_type]').change(function() {
	updateBaseSettings();
	mainCalculate();
    });

    // initialize reset button
    $('#reset_area input[type=button]').click(function() {
	reset();
    });

    // initialize facebook share button
    $('#facebook_link').on('click',function() {
	var h=400;
	var w=680;
	var y = window.outerHeight / 2 + window.screenY - (h / 2);
	var x = window.outerWidth / 2 + window.screenX - (w / 2);
        window.open(
            'https://www.facebook.com/sharer/sharer.php?u='+
		encodeURIComponent('http://crfb.org/blogs/interactive-tool-reforming-candidates-fiscal-plans'),
            'facebook-share-dialog',
	    'width='+w+',height='+h+',top='+y+',left='+x)
    });

    // calculate and display charts
    g_chart_loaded = true;
    setTarget('stabilize');
    updateBaseSettings();
    mainCalculate();
}

function reset() {
    $('input[type=radio][name=target]').filter('[value=stabilize]').prop('checked',true);
    setTarget('stabilize');
    $('.exclude input[type=checkbox]').prop('checked', false);
    $('input[type=radio][name=tax_type]').filter('[value=all]').prop('checked',true);
    $('#custom_target').val((g_custom_default*100).toFixed());
    updateBaseSettings();
    mainCalculate();
}

function setTarget(tgtval) {
    var spendpct, taxpts, targetpct = 0;
    switch (tgtval) {
    case 'stabilize':
	g_target_fixed = true;
	targetpct = g_stable_target;
	break;
    case 'balance':
	g_target_fixed = true;
	targetpct = g_balance_target;
	break;
    case 'custom':
	g_target_fixed = true;
	targetpct = g_custom_target;
	break;
    case 'free':
    default:
	g_target_fixed = false;
    }
    if (g_target_fixed) {
	g_target_value = my_base_debt[9] - (targetpct * g_base_gdp[9]);
	balanceSliders();
    }
        configureTweet(tgtval);
}

function balanceSliders() {
    var taxpts;
    if (g_tax_quadfact != 0) {
	var radical = Math.pow(g_tax_linfact,2)+(4*g_tax_quadfact*(g_target_value/2));
	taxpts = roundUp((((-1)*g_tax_linfact) + Math.sqrt(radical))/(2*g_tax_quadfact));
    } else {
	taxpts = roundUp(((g_target_value/2) / g_tax_linfact));
    }
    setSliderVal('tax',taxpts);
}

function solveForSpend(taxpts) {
    var spendpct = roundUp((g_target_value - (g_tax_linfact * taxpts) - (g_tax_quadfact * Math.pow(taxpts,2)))/ g_spend_factor);
    return spendpct;
}

function solveForTax(spendpct) {
    var taxpts;
    if (g_tax_quadfact != 0) {
	var radical =  Math.pow(g_tax_linfact,2) - (4*g_tax_quadfact*(spendpct*g_spend_factor - g_target_value));
	if (radical > 0) {
	    taxpts = roundUp((((-1)*g_tax_linfact) + Math.sqrt(radical)) / (2*g_tax_quadfact));
	} else {
	    taxpts = -1;
	}
    } else {
	taxpts = roundUp(((g_target_value - (g_spend_factor * spendpct)) / g_tax_linfact));
    }
    return taxpts;
}

function roundUp(num) {
    return Math.ceil(num * g_scale_factor) / g_scale_factor;
}

function configureTweet(tgtval) {
    var achieve = encodeURI('I fixed ' + g_cand_name + '\'s plan to ');
    switch (tgtval) {
    case 'stabilize':
	achieve += encodeURI('stabilize the debt');
	break;
    case 'balance':
	achieve += encodeURI('balance the budget');
	break;
    case 'custom':
	achieve += encodeURI('reduce debt to '
			     + (g_custom_target*100).toFixed() + '% of GDP');
	break;
    case 'free':
    default:
	achieve = encodeURI('improve fiscal responsibility');
    }
    achieve += encodeURI(' and you can too:');
    var tweetlink = 'https://twitter.com/intent/tweet';
    tweetlink += '?text='+achieve;
    tweetlink += '&url='+encodeURI('http://crfb.org/blogs/interactive-tool-reforming-candidates-fiscal-plans');
    tweetlink += '&via=BudgetHawks';
    $('#twitter_link').attr('href',tweetlink);
}

function customHandler() {
    try {
	var val = $('#custom_target').val();
	val = val.replace(/^\d.-/g,'');
	val = Math.round(val*1)/100;
	if (isNaN(val)) {
	    alert('target must be between '+(g_custom_min*100).toFixed()
		  +'% and '+(g_custom_max*100).toFixed()+'%');
	    val = g_custom_default;
	}
	else if (val < g_custom_min) {
	    alert('target must be between '+(g_custom_min*100).toFixed()
		   +'% and '+(g_custom_max*100).toFixed()+'%');
	    val = g_custom_min;
	}
	else if (val > g_custom_max) {
	    alert('target must be between '+(g_custom_min*100).toFixed()
		  +'% and '+(g_custom_max*100).toFixed()+'%');
	    val = g_custom_max;
	}
	    $('#custom_target').val((val*100).toFixed());
	g_custom_target = val;
	if ($('input[name=target]:checked').val() == 'custom')
	    setTarget('custom');
    } catch(ex) {
	console.log(ex);
    }
}

function updateBaseSettings() {
    // update exclusions
    var t_base_spend = new Array();
    for (var i = 0; i < g_base_spend.length; i++) {
	t_base_spend[i] = Math.abs(g_base_spend[i]);
	if ($('#soc_sec_exclude').prop('checked'))
	    t_base_spend[i] -= g_soc_sec_cost[i];
	if ($('#medicare_exclude').prop('checked'))
	    t_base_spend[i] -= g_medicare_cost[i];
	t_base_spend[i] *= -1;
    }
    my_base_spend = t_base_spend;

    //set base factors
    var t_spend_factor = 0;
    var t_tax_linfact = 0;
    var t_tax_quadfact = 0;
    for (var i = 0; i < g_base_spend.length; i++) {
	var sum = 0;
	for (var j = 0; j < 10; j++) {
	    sum += g_int_matrix[i][j];
	}
	t_spend_factor += ((sum+1) * my_base_spend[i] / (-100));
	if ($('input[name=tax_type]:checked').val() == 'high') {
	    var i_tax_linfact = g_base_tax[i];
	    var i_tax_quadfact = 0;
	    for (var j = 0; j < g_tax_fixers.length; j++) {
		i_tax_linfact += g_tax_fixers[j][i]*g_tax_scalars[j];
		i_tax_quadfact += g_tax_fixers[j][i];
	    }
	    t_tax_linfact += (1 + sum) * i_tax_linfact;
	    t_tax_quadfact += (1 + sum) * i_tax_quadfact;
	} else {
	    t_tax_linfact  += ((sum+1) * g_base_taxfull[i]);
	}	
    }
    g_spend_factor = Math.round(t_spend_factor * 1000) / 1000;
    g_tax_quadfact = Math.round(t_tax_quadfact * 1000) / 1000;
    g_tax_linfact = Math.round(t_tax_linfact * 1000) / 1000;
    
    // reset sliders
    if (g_target_fixed)
	balanceSliders();
}

/* returns the slider val to one decimal place */
function getSliderVal(src) {
    return $('#'+src+'_slider').slider('option','value')/g_scale_factor;
}

/* sets the slider val up to one decimal place */
function setSliderVal(tgt, val) {
    $('#'+tgt+'_slider').slider('value',(g_scale_factor*val).toFixed());
}

/* update associated text input, recalculate */
function slideUpdateFunc(src, tgt, func, otherfunc) {
    try {
	var val = getSliderVal(src);
	if (g_target_fixed && !updating) {
	    updating = true;
	    var otherval = func(val);
	    if (otherval > $('#'+tgt+'_slider').slider('option','max')/g_scale_factor) {
		otherval = $('#'+tgt+'_slider').slider('option','max')/g_scale_factor;
		val = Math.round(otherfunc(otherval)*g_scale_factor)/g_scale_factor;
		setSliderVal(src,val);
	    } else if (otherval < $('#'+tgt+'_slider').slider('option','min')/g_scale_factor){
		otherval = $('#'+tgt+'_slider').slider('option','min')/g_scale_factor;
		val = Math.round(otherfunc(otherval)*g_scale_factor)/g_scale_factor;
		setSliderVal(src,val);
	    }
	    setSliderVal(tgt,otherval);
	    updating = false;
	}
	$('#'+src+'_slider').find('.ui-slider-handle').html(
	    (Math.abs(val + (src == 'tax' ? g_base_toptax : 0))).toFixed()
	);
	$('#'+src+'_in').val(val.toFixed());
	mainCalculate();
    } catch(ex) {
	console.log(ex);
    }
}

/* update asssociated slider, recalculate */
function textUpdateFunc(src, min, max) {
    try {
	var val = $('#'+src+'_in').val();
	val = val.replace(/^\d.-/g,'');
	val = Math.round(val*g_scale_factor)/g_scale_factor;
	if (isNaN(val))
	    val = 0;
	else if ($(src).val() < min)
	    val = min;
	else if ($(src).val() > max)
	    val = max;
	$('#'+src+'_in').val(val.toFixed());
	setSliderVal(src,val);
	mainCalculate();
    } catch(ex) {
	console.log(ex);
    }
}

/* feed inputs into chart creation */
function mainCalculate() {
    var spendpct = getSliderVal('spending');
    var taxup   = getSliderVal('tax');
    if (g_chart_loaded) {
	drawChart(spendpct, taxup);
    }
}

function calcSpend(spendpct, year) {
    return my_base_spend[year] * spendpct / 100;
}

function calcRev(taxup, year) {
    if ($('input[name=tax_type]:checked').val() == 'high') {
	var a1 = g_base_tax[year], a2 = 0;
	for (var j = 0; j < g_tax_fixers.length; j++) {
	    a1 += g_tax_fixers[j][year] * g_tax_scalars[j];
	    a2 += g_tax_fixers[j][year];
	}
	return (a1 * taxup) + (a2 * Math.pow(taxup,2));
    } else {
	return g_base_taxfull[year] * taxup;
    }
}

/* prepare and draw charts */
function drawChart(spendpct, taxup) {
    var tot_dspend = 0;
    var tot_drev   = 0;

    // prepare series chart
    var seriesData = new google.visualization.DataTable();
    seriesData.addColumn('date', 'Year');
    seriesData.addColumn('number', 'My Plan');
    seriesData.addColumn('number', g_cand_name + ' Baseline');
    for (var i = 0; i < g_base_gdp.length; i++) {
	var year = 2017 + i;
	var my_drev = calcRev(taxup, i);
	var my_dspend = calcSpend(spendpct, i);
	var my_dint = 0;
	for (var j = 0; j <= i; j++) {
	    var diff = calcSpend(spendpct, j) - calcRev(taxup, j);
	    my_dint += diff * g_int_matrix[j][i];
	}
	var my_deficit = my_dspend + my_dint - my_drev;
	var myplan;
	if (i > 0) {
	    myplan = ((seriesData.getValue(i-1, 1)*g_base_gdp[i-1])
		      + my_base_debt[i]
		      - my_base_debt[i-1] + my_deficit) / g_base_gdp[i];
	} else {
	    myplan = (my_base_debt[0] +  my_deficit) / g_base_gdp[0];
	}
	var baseline = my_base_debt[i] / g_base_gdp[i];
	seriesData.addRow([new Date(year,0,1), myplan, baseline]);
	tot_dspend += my_dspend;
	tot_drev   += my_drev;
    }
    // format data for display
    var dateFormatter = new google.visualization.DateFormat({ pattern: 'yyyy' });
    dateFormatter.format(seriesData, 0);
    var debtFormatter = new google.visualization.NumberFormat({ pattern: '###%' });
    debtFormatter.format(seriesData, 1);
    debtFormatter.format(seriesData, 2);
    var seriesOpts = {
	chartArea: {
	    left: '10%',
	    top: '5%',
	    width: '75%',
	    height: '85%'
	},
	vAxis: {
	    textStyle: {
		bold: true
	    },
	    viewWindow: {
		min: 0.5,
		max: (g_cand_name == 'Trump' ? 1.1 : 1)
	    },
	    format: 'percent',
	    ticks: (g_cand_name == 'Trump'
		    ? [0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1,1.05,1.1]
		    : [0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1])
	},
	hAxis: {
	    textStyle: {
		bold: true
	    },
	    viewWindow: {
		min: new Date(2017,0,1),
		max: new Date(2026,0,1)
	    },
	    gridlines: {
		color: 'transparent'
	    },
	    ticks: [new Date(2017,0,1), new Date(2018,0,1), new Date(2019,0,1),
		    new Date(2020,0,1), new Date(2021,0,1), new Date(2022,0,1),
		    new Date(2023,0,1), new Date(2024,0,1), new Date(2025,0,1),
		    new Date(2026,0,1)]
	},
	legend: 'none',
	lineWidth: 2,
	backgroundColor: {
	    fill: 'transparent'
	},
	series: {
	    0: {
		color: g_line_color
	    },
	    1: {
		color: g_line_color,
		lineDashStyle: [5,5]
	    }
	}
    };
    var seriesChart = new google.visualization.ChartWrapper({
	chartType: 'LineChart',
	dataTable: seriesData,
	options: seriesOpts,
	containerId: 'series_area'
    });

    // prepare pie chart
    if (tot_drev-tot_dspend == 0) {
	tot_dspend = -10;
	tot_drev = 10;
    }
    var pieData = new google.visualization.DataTable();
    pieData.addColumn('string','Source');
    pieData.addColumn('number','Total');
    pieData.addRows([
	['Spending Cuts',-tot_dspend/1000],
	['Tax Increases',tot_drev/1000]
    ]);
    var pieFormatter = new google.visualization.NumberFormat({
	pattern: '$##.# trillion'
    });
    pieFormatter.format(pieData,1);
    var pieOpts = {
	chartArea: {
	    left: '5%',
	    top: '5%',
	    width: '60%',
	    height: '90%'
	},
	legend: 'none',
	backgroundColor: {
	    fill: 'transparent'
	},
	colors: ['#6c556c', '#2f6534'],
	fontSize: 12
    };
    var pieChart = new google.visualization.ChartWrapper({
	chartType: 'PieChart',
	dataTable: pieData,
	options: pieOpts,
	containerId: 'pie_area'
    });
    
    // draw to screen
    seriesChart.draw();
    pieChart.draw();
}
