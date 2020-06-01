import React from 'react';
import './TrainingDetails.component.scss';
import {ComboBoxComponent} from '../comboBox/ComboBox.component';
const textArray = ['lorem ipsum','excelcior zexes','costam costam', 'dodatkowy element'];


export default function TrainingDetailsComponent(props) {
    return (
        <div className="training-details-component">
            Training details
            <ComboBoxComponent values={textArray} />
        </div>
    );
}
