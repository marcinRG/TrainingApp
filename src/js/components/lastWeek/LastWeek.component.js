import React, {useRef, useEffect} from 'react';
import './LastWeek.component.scss';
import {createChart, transformInputData, createPieChart, dataStatus} from '../../utilsAndSettings/d3.utils';
import {weeklyData} from '../../data/init.data';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';

const chartProperties = {
    margins: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
    },
    xMax: 500,
    yMax: 500,
};


export default function LastWeekComponent(props) {
    const svgRef = useRef();

    useEffect(() => {
        console.log('init last week');
        const array = objectPropertiesToArray(weeklyData);
        console.log(array);
        svgRef.current = createChart(svgRef.current,
            {
                status: dataStatus.OK,
                data: array
            }, chartProperties,createPieChart);
    }, []);

    return (
        <div className="last-week-container page-container">
            <h2 className="last-week-title">Last week</h2>
            <div className="chart-component">
                <label className="chart-title">Chart title</label>
                <svg ref={svgRef} className="chart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                </svg>
            </div>
        </div>
    );
}
