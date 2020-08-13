import React, {useRef, useEffect, useContext} from 'react';
import './LastWeek.component.scss';
import {createChart, transformInputData, createPieChart, dataStatus} from '../../utilsAndSettings/d3.utils';
import {weeklyData} from '../../data/init.data';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';
import {UserDataContext} from '../../appContext/UserDataContext';

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


export default function LastWeekComponent() {
    const userDataContext = useContext(UserDataContext);
    const svgRef = useRef();

    useEffect(() => {
        const array = objectPropertiesToArray(weeklyData);
        svgRef.current = createChart(svgRef.current,
            {
                status: dataStatus.OK,
                data: array
            }, chartProperties,createPieChart);
    }, []);

    console.log(userDataContext.getLastWeekTrainings());

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
