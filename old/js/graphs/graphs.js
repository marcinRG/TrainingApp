'use strict';
var d3 = require('d3');

console.log('Hello world');
var dataArray = [12, 45, 20, 3, 8];
var dataDays = ['Pon', 'Wto', 'Śro', 'Czw', 'Pio'];
console.log(dataArray.length);
var margins = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
};

var rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0, dataDays.length]);
var maxSize = 400;
var barWidth = (maxSize / dataArray.length);

var yDataScale = d3.scaleLinear()
    .domain([d3.max(dataArray), 0])
    .range([0, maxSize]);

var xDataScale = d3.scaleBand()
    .domain(dataDays)
    .range([0, maxSize]);

var xAxis = d3.axisBottom(xDataScale);

var yAxis = d3.axisLeft(yDataScale).ticks(4).tickSize(10);

var svg = d3.select('div.svg').append('svg')
    .attr('height', maxSize + margins.top + margins.bottom)
    .attr('width', maxSize + margins.left + margins.right);

var chart = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    .attr('height', maxSize)
    .attr('width', maxSize);

var xAx = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + (margins.top + maxSize) + ')')
    .call(xAxis);

var yAx = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    .call(yAxis);

chart.selectAll('rect')
    .data(dataArray)
    .enter().append('rect')
    .attr('width', barWidth)
    .attr('fill', function (d, i) {
        return rainbow(i);
    })
    .attr('x', function (d, i) {
        return barWidth * (i);
    })
    .attr('y', function (d) {
        return yDataScale(d);
    })
    .attr('height', function (d) {
        return maxSize - yDataScale(d);
    });

var svg2 = d3.select('div.svg-2').append('svg')
    .attr('height', maxSize + margins.top + margins.bottom)
    .attr('width', maxSize + margins.left + margins.right);

var dataArray2 = [1, 12, 15, 24, 56, 11, 5, 56];

var line = d3.line().y(
    function (d) {
        return maxSize - (d * 5);
    }
).x(
    function (d, i) {
        return i * (maxSize / dataArray2.length);
    }
).curve(d3.curveNatural);

var area = d3.area()
    .x(
        function (d, i) {
            return i * (maxSize / dataArray2.length);
        }
    )
    .y0(maxSize)
    .y1(function (d) {
        return maxSize - (d * 5);
    })
    .curve(d3.curveCardinal);

var chart2 = svg2.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    .attr('height', maxSize)
    .attr('width', maxSize);

chart2.append('path').attr('d', area(dataArray2))
    .attr('fill', 'black')
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
