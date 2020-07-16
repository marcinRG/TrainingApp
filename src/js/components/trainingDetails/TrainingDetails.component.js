import React, {useState, useEffect, useRef} from 'react';
import './TrainingDetails.component.scss';
import {ComboBoxComponent} from '../comboBox/ComboBox.component';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';
import {trainingData} from '../../data/init.data';
import {AreaChartComponent} from '../areaChart/areaChart.component';

export default function TrainingDetailsComponent() {

    const values = ['calories', 'distance', 'heartbeat'];
    const [selected, setSelected] = useState(0);
    const [distanceData, setDistanceData] = useState([]);
    const [caloriesData, setCaloriesData] = useState([]);
    const [heartbeatData, setHeartbeatData] = useState([]);

    useEffect(() => {
        setCaloriesData(objectPropertiesToArray(trainingData.calories));
        setDistanceData(objectPropertiesToArray(trainingData.distance));
        setHeartbeatData(objectPropertiesToArray(trainingData.heartbeatRate));
    }, []);


    const changeSelected = (text) => {
        const index = values.indexOf(text);
        if (index >= 0) {
            setSelected(index);
        }
    }

    return (
        <div className="training-details-component">
            <div className="combobox-input-wrapper">
                <ComboBoxComponent values={values} selected={getValueFromArray(selected, values)}
                                   actionSelect={changeSelected}/>
            </div>

            <div className="charts-container">
                <AreaChartComponent data={caloriesData} selected={selected} id={0} title={values[0]}/>
                <AreaChartComponent data={distanceData} selected={selected} id={1} title={values[1]}/>
                <AreaChartComponent data={heartbeatData} selected={selected} id={2} title={values[2]}/>
            </div>
        </div>
    );
}

function getValueFromArray(index, array) {
    if (index < array.length) {
        return array[index];
    }
    return '';
}
