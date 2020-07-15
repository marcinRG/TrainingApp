import React, {useRef, useEffect} from 'react';
import './LastTraining.component.scss';
import TrainingDetailsComponent from '../trainingDetails/TrainingDetails.component';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';
import {trainingData} from '../../data/init.data';
import {createAreaChart, createChart, dataStatus} from '../../utilsAndSettings/d3.utils';

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

export default function LastTrainingComponent(props) {
    const distanceSvg = useRef();
    const caloriesSvg = useRef();
    const heartbeatSvg = useRef();

    useEffect(() => {
        console.log('init last week');
        const caloriesData = objectPropertiesToArray(trainingData.calories);
        const distanceData = objectPropertiesToArray(trainingData.distance);
        const heartbeatData = objectPropertiesToArray(trainingData.heartbeatRate);

        distanceSvg.current = createChart(distanceSvg.current,
            {
                status: dataStatus.OK,
                data: distanceData
            }, chartProperties, createAreaChart);

        caloriesSvg.current = createChart(caloriesSvg.current,
            {
                status: dataStatus.OK,
                data: caloriesData
            }, chartProperties, createAreaChart);

        heartbeatSvg.current = createChart(heartbeatSvg.current,
            {
                status: dataStatus.OK,
                data: heartbeatData
            }, chartProperties, createAreaChart);

    }, []);

    return (
        <div className="last-training-container page-container">
            <h2 className="last-training-title">Last training</h2>
            <div className="combobox-input-wrapper">
                <TrainingDetailsComponent/>
            </div>
            <div className="charts-container">
                <div className="chart-component first">
                    <label className="chart-title">Chart title</label>
                    <svg ref={distanceSvg} className="chart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    </svg>
                </div>
                <div className="chart-component second">
                    <label className="chart-title">Chart title</label>
                    <svg ref={caloriesSvg} className="chart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    </svg>
                </div>
                <div className="chart-component third">
                    <label className="chart-title">Chart title</label>
                    <svg ref={heartbeatSvg} className="chart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    </svg>
                </div>
            </div>

        </div>
    );
}

