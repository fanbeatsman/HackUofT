var w = 1000;
var h = 500;

var testData = [{ x: 1,y: 5}, {x: 20,y: 20}, {x: 40,y: 10}, {x: 60,y: 40}, {x: 80,y: 5}, {x: 100,y: 60}];

var dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];

var x = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([0,d3.max(dataset)*10]); 
//d, and i are vars given by D3.js. Can be called by anonymous function or wtv. d = current value at __data__. i refers to the index of the data eg in the array it came from


var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("heigh",h);

svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d){return d[0];})
	.attr("cy", function(d){return d[1];})
	.attr("r",5);

var line = d3.svg.line()
	.x(function(d){ return x(d[0]);})
	.y(function(d){ return y(d[1]);});