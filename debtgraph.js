/* crfb debt graph interactive tool
 * js to link inputs to chart display
 * see chartdata.js for undelying numbers
 * Rick Dionne, July 2016
 */

/* slider ranges */
var g_slider_min = -50;
var g_slider_max =  50;

var g_chart_loaded = false;
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(chartLoaded);

function chartLoaded() {
    // initialize sliders
    $("#spending_slider, #revenue_slider").slider({
	orientation: "vertical"
    });
    $("#spending_slider").slider({
	min: g_slider_min,
	max: g_slider_max,
	value: 0,
	change: function(event, ui) {
	    slideUpdateFunc("#spending_slider","#spending_in");
	},
	slide: function(event, ui) {
	    slideUpdateFunc("#spending_slider","#spending_in");
	}
    });
    $("#revenue_slider").slider({
	min: g_slider_min,
	max: g_slider_max,
	value: 0,
	change: function(event, ui) {
	    slideUpdateFunc("#revenue_slider","#revenue_in");
	},
	slide: function(event, ui) {
	    slideUpdateFunc("#revenue_slider","#revenue_in");
	}
    });

    // initialize text inputs
    $("#spending_in").change(function() {
	textUpdateFunc("#spending_in","#spending_slider", g_slider_min, g_slider_max);
    });
    $("#revenue_in").change(function() {
	textUpdateFunc("#revenue_in","#revenue_slider", g_slider_min, g_slider_max);
    });

    // calculate and display chart
    g_chart_loaded = true;
    mainCalculate();
}

function slideUpdateFunc(src, tgt) {
    try {
	var val = $(src).slider("option","value");
	$(tgt).val(val);
	mainCalculate();
    } catch(ex) {
	console.log(ex);
    }
}

function textUpdateFunc(src, tgt, min, max) {
    try {
	var val = $(src).val();
	val = val.replace(/^\d.-/g,'');
	val = Math.round(val*1);
	if (isNaN(val))
	    val = 0;
	$(src).val(val);
	if ($(src).val() > min && $(src).val() < max) {
	    $(tgt).slider('value',$(src).val());
	}
	mainCalculate();
    } catch(ex) {
	console.log(ex);
    }
}

function mainCalculate() {
    var spendpct = $("#spending_slider").slider("option", "value");
    var revpct   = $("#revenue_slider").slider("option", "value");
    drawChart(spendpct, revpct);
}

function drawChart(spendpct, revpct) {
    if (g_chart_loaded) {
	var seriesData = new google.visualization.DataTable();
	seriesData.addColumn('date', 'Year');
	seriesData.addColumn('number', 'Current Law');
	seriesData.addColumn('number', 'Clinton');
	seriesData.addColumn('number', 'Trump');
	seriesData.addColumn('number', 'My Plan');
	for (var i = 0; i < g_base_gdp.length; i++) {
	    var year = 2017 + i;
	    var curr = g_base_debt[i] / g_base_gdp[i];
	    var clinton_def =
		g_clinton_drev[i] - g_clinton_dout[i] + g_clinton_dint[i];
	    var trump_def =
		g_trump_drev[i] - g_trump_dout[i] + g_trump_dint[i];
	    var clinton, trump, myplan;
	    var my_drev = g_base_rev[i] * revpct / 100;
	    var my_dspend = g_base_out[i] * spendpct / 100;
	    var my_deficit = my_drev - my_dspend;
	    if (i > 0) {
		clinton = ((seriesData.getValue(i-1, 2)*g_base_gdp[i-1])
			   + g_base_debt[i]
			   - g_base_debt[i-1] - clinton_def) / g_base_gdp[i];
		trump = ((seriesData.getValue(i-1, 3)*g_base_gdp[i-1])
			 + g_base_debt[i]
			 - g_base_debt[i-1] - trump_def) / g_base_gdp[i];
		myplan = ((seriesData.getValue(i-1, 4)*g_base_gdp[i-1])
			  + g_base_debt[i]
			  - g_base_debt[i-1] - my_deficit) / g_base_gdp[i];
	    } else {
		clinton = (g_base_debt[0] - clinton_def) / g_base_gdp[0];
		trump = (g_base_debt[0] - trump_def) / g_base_gdp[0];
		myplan = (g_base_debt[0] - my_deficit) / g_base_gdp[0];
	    }
	    seriesData.addRow([new Date(year,0,1), curr, clinton, trump, myplan]);
	}
	var seriesOpts = {
	    title: '10 Year Debt Projections',
	    chartArea: {
		left: '10%',
		top: '10%',
		width: '80%',
		height: '80%'
	    },
	    vAxis: {
		viewWindow: {
		    min: 0.25,
		    max: 1.5
		},
		format: 'percent',
		ticks: [0.25, 0.5, 0.75, 1, 1.25, 1.5]
	    },
	    legend: 'bottom',
	    series: {
		0: {
		    color: 'orange',
		    lineWidth: 5,
		    lineDashStyle: [10,2]
		},
		1: { color: 'blue' },
		2: { color: 'red' },
		3: { color: 'green' }
	    }
	};
	var seriesChart = new google.visualization.ChartWrapper({
	    chartType: 'LineChart',
	    dataTable: seriesData,
	    options: seriesOpts,
	    containerId: 'series_area'
	});
	var endData = google.visualization.arrayToDataTable([
	    ['Plan', 'Debt', { role: 'style' }],
	    ['Current Law', seriesData.getValue(9,1), 'orange'],
	    ['Clinton', seriesData.getValue(9,2), 'blue'],
	    ['Trump', seriesData.getValue(9,3), 'red'],
	    ['My Plan', seriesData.getValue(9,4), 'green']
	]);
	var endOpts = {
	    title: 'Debt in 2026',
	    chartArea: {
		left: '10%',
		top: '10%',
		width: '80%',
		height: '80%'
	    },
	    vAxis: {
		viewWindow: {
		    min: 0,
		    max: 1.5
		},
		format: 'percent',
		ticks: [0.25, 0.5, 0.75, 1, 1.25, 1.5]
	    },
	    legend: 'none'
	};
	var endChart = new google.visualization.ChartWrapper({
	    chartType: 'ColumnChart',
	    dataTable: endData,
	    options: endOpts,
	    containerId: 'end_area'
	});
	
	// draw to screen
	seriesChart.draw();
	endChart.draw();

	// update text
	$( "#score" ).html( (100 * seriesData.getValue(9,4)).toFixed() + "%" );
    }
}
