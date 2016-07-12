/* crfb debt graph interactive tool
 * js to link inputs to chart display
 * see chartdata.js for undelying numbers
 * Rick Dionne, July 2016
 */

/* copy global vars */
my_base_spend = g_base_spend;
my_base_tax   =   g_base_tax;
my_base_debt  =  g_base_debt;

/* prevent recursive loop */
var updating = false;

/* fixed target mode */
var g_target_fixed = false;
var g_target_value = 0;
var g_spend_factor = 0;
var g_tax_factor   = 0;

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

    // initialize exclusion checkboxes
    $('.exclude input[type=checkbox]').change(function() {
	updateBaseSettings();
	mainCalculate();
    });

    // initialize reset button
    $('#reset_area input[type=button]').click(function() {
	reset();
    });

    // calculate and display charts
    g_chart_loaded = true;
    updateBaseSettings();
    mainCalculate();
}

function reset() {
    $('#tax_slider').slider('value', g_tax_default);
    $('#spending_slider').slider('value', g_spending_default);
    $('.exclude input[type=checkbox]').prop('checked', false);
    updateBaseSettings();
    mainCalculate();
}

function setTarget(tgtval) {
    var spendpct, taxpts, targetpct = 0;
    switch (tgtval) {
    case 'stabilize':
	g_target_fixed = true;
	targetpct = 0.75;
	break;
    case 'balance':
	g_target_fixed = true;
	targetpct = 0.57;
	break;
    default:
	g_target_fixed = false;
    }
    if (g_target_fixed) {
	g_target_value = my_base_debt[9] - (targetpct * g_base_gdp[9]);
	balanceSliders();
    }
}

function balanceSliders() {
    g_target_fixed = false;
    var spendpct = (g_target_value / 2) / g_spend_factor;
    var taxpts = ((g_target_value / 2) / g_tax_factor) + (g_tax_min / g_scale_factor);
    setSliderVal('spending',spendpct);
    setSliderVal('tax',taxpts);
    g_target_fixed = true;
}

function solveForSpend(taxpts) {
    return ((g_target_value - (g_tax_factor * (taxpts - (g_tax_min / g_scale_factor))))
	    / g_spend_factor);
}

function solveForTax(spendpct) {
    return (((g_target_value - (g_spend_factor * spendpct)) / g_tax_factor)
	    + (g_tax_min / g_scale_factor));
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
    var t_tax_factor = 0;
    for (var i = 0; i < g_base_spend.length; i++) {
	var sum = 0;
	for (var j = 0; j < 10; j++) {
	    sum += g_int_matrix[i][j];
	}
	t_spend_factor += ((sum+1) * my_base_spend[i] / (-100));
	t_tax_factor   += ((sum+1) * my_base_tax[i]);
    }
    g_spend_factor = Math.round(t_spend_factor * 1000) / 1000;
    g_tax_factor = Math.round(t_tax_factor * 1000) / 1000;

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
	    /* debug console.log('val: ' + val + ' otherval: ' + otherval); */
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
	$('#'+src+'_in').val(val.toFixed(1));
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
	$('#'+src+'_in').val(val.toFixed(1));
	setSliderVal(src,val);
	mainCalculate();
    } catch(ex) {
	console.log(ex);
    }
}

/* feed inputs into chart creation */
function mainCalculate() {
    var spendpct = getSliderVal('spending');
    var taxpts   = getSliderVal('tax');
    /*debug console.log('spend: ' + spendpct + ' tax: ' +taxpts); */
    if (g_chart_loaded) {
	drawChart(spendpct, taxpts);
    }
}

/* prepare and draw charts */
function drawChart(spendpct, taxpts) {
    var seriesData = new google.visualization.DataTable();
    seriesData.addColumn('date', 'Year');
    seriesData.addColumn('number', 'My Plan');
    for (var i = 0; i < g_base_gdp.length; i++) {
	var year = 2017 + i;
	var my_drev = my_base_tax[i] * (taxpts - (g_tax_min/g_scale_factor));
	var my_dspend = my_base_spend[i] * spendpct / 100;
	var my_dint = 0;
	for (var j = 0; j <= i; j++) {
	    var diff = ((my_base_spend[j] * spendpct / 100) -
			(my_base_tax[j] * (taxpts - (g_tax_min/g_scale_factor))));
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
	/* debug 
	console.log(year
		    +' drev: ' + my_drev.toFixed(1)
		    +' dspend: ' + my_dspend.toFixed(1)
		    +' dint: ' + my_dint.toFixed(1)
		   ); */
	seriesData.addRow([new Date(year,0,1), myplan]);
    }
    /* debug  var thisval = ((my_base_spend[9] * spendpct)
			       - (my_base_tax[9] * taxpts)); */
    /* debug  console.log('actual: ' + thisval); */
    var seriesOpts = {
	chartArea: {
	    left: '10%',
	    top: '5%',
	    width: '85%',
	    height: '85%'
	},
	vAxis: {
	    viewWindow: {
		min: 0.25,
		max: 1.5
	    },
	    format: 'percent',
	    ticks: [0.25, 0.5, 0.75, 1, 1.25, 1.5]
	},
	hAxis: {
	    viewWindow: {
		min: new Date(2017,0,1),
		max: new Date(2026,0,1)
	    },
	    gridlines: {
		color: 'transparent'
	    },
	    ticks: [new Date(2018,0,1), new Date(2020,0,1), new Date(2022,0,1),
		    new Date(2024,0,1), new Date(2026,0,1)]
	},
	legend: 'none',
	lineWidth: 3,
	series: {
	    0:	{ color: g_line_color }
	}
    };
    var seriesChart = new google.visualization.ChartWrapper({
	chartType: 'LineChart',
	dataTable: seriesData,
	options: seriesOpts,
	containerId: 'series_area'
    });

    // draw to screen
    seriesChart.draw();

// update text
    var score = Math.round(seriesData.getValue(9,1)*100);
    $( '#debt_score' ).html(
	(score > 0) ?
	    score + '%' : '0%'
    );
    $( '#spend_score' ).html( Math.abs(spendpct).toFixed(1) + '%' );
    $( '#tax_score' ).html( Math.abs(taxpts).toFixed(1) + '%' );
}
