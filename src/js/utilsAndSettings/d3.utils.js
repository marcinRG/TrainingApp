import * as d3 from 'd3';

export const dataStatus = {
    OK: 'OK',
    ERROR: 'Error'
}

export function isDataValid(array) {
    return true;
}

export function transformInputData(array) {
    if (isDataValid(array)) {
        return {
            status: dataStatus.OK,
            data: array
        };
    }
    return {
        status: dataStatus.ERROR,
        data: [],
        errorMsg: 'Error occurred. Data table should not contain any blank fields'
    };
}

export function getChartWidth(chartProperties) {
    return chartProperties.xMax - (chartProperties.margins.left + chartProperties.margins.right);
}

export function getChartHeight(chartProperties) {
    return chartProperties.yMax - (chartProperties.margins.top + chartProperties.margins.bottom);
}

export function getExtent(data, field, addBounds) {
    const extent = d3.extent(data, (d) => {
        return d[field];
    });
    if (addBounds) {
        extent[0] = extent[0] - .1 * extent[0];
        extent[1] = extent[1] + .1 * extent[1];
    }
    return extent;
}

export function getYRange(charProperties) {
    return [getChartHeight(charProperties), 0];
}

export function getXRange(chartProperties) {
    return [0, getChartWidth(chartProperties)];
}

export function getScale(range, extent) {
    return d3.scaleLinear().domain(extent).range(range);
}

function translateElement(element, left, top) {
    return element.attr('transform', `translate(${left} ${top})`);
}

export function appendXAxis(svgElement, scale, chartProperties) {
    let axisXSvg = svgElement.append('g').attr('class', 'axis x');
    axisXSvg = translateElement(axisXSvg, chartProperties.margins.left,
        chartProperties.margins.top + getChartHeight(chartProperties));
    const axis = d3.axisBottom(scale).ticks(3);
    axisXSvg.call(axis);
    const ticks = axisXSvg.selectAll('.tick');
    ticks.attr('class', 'circles');
    ticks.append('circle').attr('r', 2);
}

export function appendYAxis(svgElement, scale, chartProperties) {
    let axisYSvg = svgElement.append('g').attr('class', 'axis y');
    axisYSvg = translateElement(axisYSvg, chartProperties.margins.left, chartProperties.margins.top);
    const axis = d3.axisLeft(scale).ticks(3);
    axisYSvg.call(axis);
    const ticks = axisYSvg.selectAll('.tick');
    ticks.attr('class', 'circles');
    ticks.append('circle').attr('r', 2);
}

export function appendXGrid(svgElement, scale, chartProperties) {
    let gridXSvg = svgElement.append('g').attr('class', 'grid x');
    gridXSvg = translateElement(gridXSvg, chartProperties.margins.left,
        chartProperties.margins.top);
    const axis = d3.axisBottom(scale).tickSizeInner(getChartHeight(chartProperties)).ticks(3);
    gridXSvg.call(axis);
}

export function appendYGrid(svgElement, scale, chartProperties) {
    let gridYSvg = svgElement.append('g').attr('class', 'grid y');
    gridYSvg = translateElement(gridYSvg, chartProperties.margins.left,
        chartProperties.margins.top);
    const axis = d3.axisRight(scale).tickSizeInner(getChartWidth(chartProperties)).ticks(3);
    gridYSvg.call(axis);
}


export function appendArea(svgElement, scaleX, scaleY, chartProperties, data) {
    let chart = svgElement.append('g');
    chart = translateElement(chart, chartProperties.margins.left, chartProperties.margins.top);
    const areaGen = d3.area()
        .x((d) => {
            return scaleX(d.x);
        })
        .y0(() => {
            return scaleY(0);
        })
        .y1((d) => {
            return scaleY(d.y);
        }).curve(d3.curveCardinal);

    chart.append('path').attr('d', areaGen(data))
        .attr('class', 'chart-area')
        .attr('stroke', 'transparent');
}


function createErrorMsg(svgElement, data, settings) {
    const svg = d3.select(svgElement);
    const errorGroup = svg.append('g');
    const errorSign = errorGroup.append('text');
    errorSign.text('\u26A0').attr('x', 210).attr('y', 230).attr('class', 'svg-text-warning');
    const errorTxt = errorGroup.append('text');
    errorTxt.text('Error !!!').attr('x', 230).attr('y', 230).attr('class', 'svg-text-warning');
    const txtMsg = errorGroup.append('text');
    txtMsg.attr('x', 20)
        .attr('y', 250)
        .attr('class', 'svg-text-warning-msg')
        .attr('textLength', 440)
        .attr('lengthAdjust', 'spacing');
    txtMsg.text(data.errorMsg);
    return svgElement;
}


export function createChart(svgElement, data, settings, chartFunction) {
    const svg = d3.select(svgElement);
    svg.selectAll('g').remove();

    if (data.status === dataStatus.OK) {
        svgElement = chartFunction(svgElement, data.data, settings);
    }
    if (data.status === dataStatus.ERROR) {
        svgElement = createErrorMsg(svgElement, data, settings);
    }
    return svgElement;
}

export function createGroupedBarChart(svgElement, data, settings) {
    const svg = d3.select(svgElement);
    const transformedData = transformData(data);
    svg.selectAll('g').remove();

    const groupScale = d3.scaleBand().domain(transformedData.keys).range([0, 400]).align(.5).padding(.35);
    const groupBandwidth = groupScale.bandwidth();

    let chart = svg.append('g');
    chart.attr('class', 'chart-bar');
    chart = translateElement(chart, settings.margins.left, settings.margins.top);

    const yRange = getYRange(settings);
    const max = {...transformedData.maxValues};


    transformedData.values.forEach(value => {

        let groupPos = groupScale(value.date);

        const subGroupKeys = Object.keys(value.data);

        const subGroupScale = d3.scaleBand().domain(subGroupKeys).range([0, groupBandwidth]).align(.5).padding(.05);
        const subGroupColors = d3.scaleOrdinal().domain(subGroupKeys).range(['#b88a73', '#ffbb9a', '#eac99f']);
        let group = chart.append('g');

        group.attr('class', `group-${value.date}`);
        group.selectAll('rect').data(subGroupKeys).enter().append('rect').attr('height', (d) => {

            let scaleY = d3.scaleLinear().domain([0, max[d]]).range(yRange);
            return getChartHeight(settings) - scaleY(value.data[d]);
        })
            .attr('width', subGroupScale.bandwidth())
            .attr('fill', (d) => subGroupColors(d))
            .attr('x', (d) => {
                return (subGroupScale(d) + groupPos)
            })
            .attr('y', (d) => {
                let scaleY = d3.scaleLinear().domain([0, max[d]]).range(yRange);
                return (scaleY(value.data[d]));
            });

    });

    let axisXSvg = svg.append('g').attr('class', 'axis x');
    axisXSvg = translateElement(axisXSvg, settings.margins.left,
        settings.margins.top + getChartHeight(settings));
    const axisX = d3.axisBottom(groupScale).tickSize(0);
    axisXSvg.call(axisX);

    const scaleY = d3.scaleLinear().domain([0,1]).range(yRange);
    let axisYSvg = svg.append('g').attr('class', 'axis y');

    const formatPercent = d3.format('.0%');
    axisYSvg = translateElement(axisYSvg, settings.margins.left, settings.margins.top);
    const axis = d3.axisLeft(scaleY).tickSize(0).ticks(2).tickFormat(formatPercent);
    axisYSvg.call(axis);
    return svg;
}

function sortStr(str1, str2) {
    if (str1 < str2) {
        return -1;
    }
    if (str1 > str2) {
        return 1;
    }
    return 0;
}

function transformData(data) {
    if (data) {
        const keys = (Object.keys(data)).sort(sortStr);
        if (keys.length > 0) {
            let newData = {
                keys: keys,
                values: [],
                maxValues: {}
            };
            keys.forEach(key => {
                const obj = {
                    date: key,
                    data: data[key]
                };
                newData.values.push(obj);
                newData.maxValues = setMaxValues(newData.maxValues, data[key]);
            });
            return newData;
        }
    }
    return null;
}

function setMaxValues(maxValues, data) {
    const obj = {...maxValues};
    const keys = Object.keys(data);
    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            if (data[key] > obj[key]) {
                obj[key] = data[key];
            }
        } else {
            obj[key] = data[key];
        }
    });
    return obj;
}


export function createAreaChart(svgElement, data, settings) {
    const svg = d3.select(svgElement);
    svg.selectAll('g').remove();
    const xExtent = getExtent(data, 'x');
    const yExtent = getExtent(data, 'y');
    const xRange = getXRange(settings);
    const yRange = getYRange(settings);
    const xScale = getScale(xRange, xExtent);
    const yScale = getScale(yRange, [0, d3.max(yExtent)]);
    //appendXGrid(svg, xScale, settings);
    appendYGrid(svg, yScale, settings);
    appendArea(svg, xScale, yScale, settings, data);
    appendXAxis(svg, xScale, settings);
    appendYAxis(svg, yScale, settings);
    return svgElement;
}

