import React from 'react';
import './TrainingDetails.component.scss';
import {ComboBoxComponent} from '../comboBox/ComboBox.component';

export default function TrainingDetailsComponent(props) {
    return (
        <div className="training-details-component">
            Training details
            <ComboBoxComponent label={'costam'} />
        </div>
    );
}
