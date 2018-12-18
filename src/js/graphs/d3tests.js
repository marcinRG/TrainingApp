'use strict';

var d3 = require('d3');
var data = [1, 23, 45, 66, 78];
var minmax = d3.extent(data);
console.log(minmax);

var ps = d3.select('.test-ddd').selectAll('p').data([1, 2, 3, 4, 5, 6]).enter().append('p').text(function (d) {
    return 'jakis tekst:' + d;
}).style('background-color', function (d, i) {
    return i % 2 ? '#fff' : '#eee';
});

ps.exit().remove();
