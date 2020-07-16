import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {createAreaChart, createChart, dataStatus} from '../../utilsAndSettings/d3.utils';

const chartProperties = {
    margins: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
    },
    xMax: 800,
    yMax: 500,
};

export function AreaChartComponent(props) {

    const svgImgRef = useRef();

    useEffect(() => {
        svgImgRef.current = createChart(svgImgRef.current,
            {
                status: dataStatus.OK,
                data: props.data
            }, chartProperties, createAreaChart);

    }, [props.data]);

    return (
        <div className={getClassName(props.id, props.selected)}>
            <label className="chart-title">{props.title}</label>
            <svg ref={svgImgRef} className="chart-svg" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 800 500">
            </svg>
        </div>
    )
}

AreaChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};

function getClassName(id, current) {
    let txt = '';
    if (id - current === 1 || id - current === -2) {
        txt = 'second';
    }
    if (id - current === -1 || id - current === 2) {
        txt = 'third';
    }
    if (id - current === 0) {
        txt = 'first';
    }
    return 'chart-component ' + txt;
}
