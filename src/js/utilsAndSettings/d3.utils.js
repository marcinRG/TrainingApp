import * as d3 from 'd3';

export const dataStatus = {
    OK:'OK',
    ERROR : 'Error'
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
    const extent= d3.extent(data, (d) => {
        return d[field];
    });
    if (addBounds) {
        extent[0] = extent[0] - .1 * extent[0];
        extent[1] = extent[1] + .1 * extent[1];
    }
    return extent;
}

export function getYRange(charProperties) {
    return [getChartWidth(charProperties), 0];
}

export function getXRange(chartProperties) {
    return [0, getChartHeight(chartProperties)];
}

export function getScale(range, extent) {
    return d3.scaleLinear().domain(extent).range(range);
}

function translateElement(element, left, top) {
    return element.attr('transform', `translate(${left} ${top})`);
}

export function appendXAxis(svgElement, scale, chartProperties) {
    let axisXSvg = svgElement.append('g');
    axisXSvg = translateElement(axisXSvg, chartProperties.margins.left,
        chartProperties.margins.top + getChartHeight(chartProperties));
    const axis = d3.axisBottom(scale);
    axisXSvg.call(axis);
}

export function appendYAxis(svgElement, scale, chartProperties) {
    let axisYSvg = svgElement.append('g');
    axisYSvg = translateElement(axisYSvg, chartProperties.margins.left, chartProperties.margins.top);
    const axis = d3.axisLeft(scale);
    axisYSvg.call(axis);
}

export function appendXGrid(svgElement, scale, chartProperties) {
    let gridXSvg = svgElement.append('g').attr('class', 'grid x');
    gridXSvg = translateElement(gridXSvg, chartProperties.margins.left,
        chartProperties.margins.top);
    const axis = d3.axisBottom(scale).tickSizeInner(getChartHeight(chartProperties)).tickSizeOuter(0);
    gridXSvg.call(axis);
}

export function appendYGrid(svgElement, scale, chartProperties) {
    let gridYSvg = svgElement.append('g').attr('class', 'grid y');
    gridYSvg = translateElement(gridYSvg, chartProperties.margins.left,
        chartProperties.margins.top);
    const axis = d3.axisRight(scale).tickSizeInner(getChartWidth(chartProperties)).tickSizeOuter(0);
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
        .attr('fill', 'pink')
        .attr('stroke', 'transparent');
}

export function appendPie(svgElement, colorScale, arc, chartProperties, data) {
    let chart = svgElement.append('g');
    chart = translateElement(chart, chartProperties.xMax / 2, chartProperties.yMax / 2);
    //pie slides
    chart.selectAll().data(data).enter().append('path').attr('d', arc).attr('fill', (d) => {
        return colorScale(d.data.y);
    }).attr('stroke', 'white').attr('stroke-width', '1');
    //text
    chart.selectAll().data(data).enter().append('text').text((d) => {
        return d.data.x
    })
        .attr('transform', (d) => {
            return 'translate(' + arc.centroid(d) + ')';
        })
        .style('text-anchor', 'middle')
        .style('font-size', 10)
        .style('font-weight', 'bold');
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
        svgElement = chartFunction(svgElement,data.data,settings);
    }
    if (data.status === dataStatus.ERROR) {
        svgElement = createErrorMsg(svgElement, data, settings);
    }
    return svgElement;
}

export function createPieChart(svgElement, data, settings) {
    const svg = d3.select(svgElement);
    const yExtent = getExtent(data, 'y');
    let color = d3.scaleLinear().domain(yExtent)
        .range(['pink', 'red']);
    const pies = d3.pie().value((d) => {
        return d.y;})(data);
    const radius = getChartHeight(settings) * 0.55 - settings.margins.left;
    const arc = d3.arc()
        .innerRadius(radius / 4)
        .outerRadius(radius);
    appendPie(svg,color,arc,settings,pies);
    return svgElement;
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
    appendXGrid(svg, xScale, settings);
    appendYGrid(svg, yScale, settings);
    appendXAxis(svg, xScale, settings);
    appendYAxis(svg, yScale, settings);
    appendArea(svg, xScale, yScale, settings, data);
    return svgElement;
}

