import React, {useState} from 'react';
import './TrainingDetails.component.scss';
import {ComboBoxComponent} from '../comboBox/ComboBox.component';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';
import {AreaChartComponent} from '../areaChart/areaChart.component';
import PropTypes from 'prop-types';

export default function TrainingDetailsComponent(props) {

    const [selected, setSelected] = useState(0);
    const names = getValuesKeys(props.data);


    const changeSelected = (text) => {
        const index = names.indexOf(text);
        if (index >= 0) {
            setSelected(index);
        }
    }

    return (
        <div className="training-details-component">
            {(names.length > 0) &&
            <React.Fragment>
                <div className="combobox-input-wrapper">
                    <ComboBoxComponent values={names} selected={getValueFromArray(selected, names)}
                                       actionSelect={changeSelected}/>
                </div>
                <div className="charts-container">
                    {names.map((name, index) =>
                        <AreaChartComponent key={index} data={getChartData(props.data, name)} selected={selected}
                                            id={index} title={names[index]}/>
                    )}
                </div>
            </React.Fragment>}
        </div>
    );
}

TrainingDetailsComponent.propTypes = {
    data: PropTypes.object,
}


function getValueFromArray(index, array) {
    if (index < array.length) {
        return array[index];
    }
    return '';
}

function getValuesKeys(data) {
    if (data && data.values) {
        const keys = Object.keys(data.values);
        if (keys.length > 0) {
            return keys;
        }
    }
    return [];
}

function getChartData(data, dataSetName) {
    if (data && data.values) {
        return objectPropertiesToArray(data.values[dataSetName]);
    }
    return [];
}