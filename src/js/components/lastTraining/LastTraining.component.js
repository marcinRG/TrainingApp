import React from 'react';
import './LastTraining.component.scss';
import TrainingDetailsComponent from '../trainingDetails/TrainingDetails.component';

export default function LastTrainingComponent(props) {
    return (
        <div className="last-training-container page-container">
            <h2 className="last-training-title">Last training</h2>
            <TrainingDetailsComponent/>
        </div>
    );
}
