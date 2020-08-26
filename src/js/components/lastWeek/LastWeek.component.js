import React, {useRef, useEffect, useContext} from 'react';
import './LastWeek.component.scss';
import {
    createGroupedBarChart
} from '../../utilsAndSettings/d3.utils';
import {objectIsNotEmpty} from '../../utilsAndSettings/utils';
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
        const weeklyData = userDataContext.getLastWeekTrainings();
        if ( objectIsNotEmpty(weeklyData)) {
            svgRef.current = createGroupedBarChart(svgRef.current, weeklyData,chartProperties);
        }

    }, [userDataContext.trainings]);

    return (
        <div className="last-week-container">
            <h2 className="last-week-title">Last 7 days of training</h2>
            <div className="chart-component">
                <label className="chart-title">Relative values of calories burned, max hart rate and distance</label>
                <svg ref={svgRef} className="chart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                </svg>
            </div>
        </div>
    );
}
