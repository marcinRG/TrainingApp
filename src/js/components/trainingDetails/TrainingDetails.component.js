import React, {useState} from 'react';
//import './TrainingDetails.component.scss';
import {ComboBoxComponent} from '../comboBox/ComboBox.component';

const textArray = ['lorem ipsum', 'excelcior zexes', 'costam costam', 'dodatkowy element'];


export default function TrainingDetailsComponent(props) {

    const values = ['calories', 'distance', 'heartbeat'];
    const [selected, setSelected] = useState(values[0]);

    const changeSelected = (text) => {
        const index = values.indexOf(text);
        if (index >= 0) {
            setSelected(values[index]);
        }
    }

    return (
        <div className="training-details-component">
            <ComboBoxComponent values={values} selected={selected} actionSelect={changeSelected}/>
        </div>
    );
}
