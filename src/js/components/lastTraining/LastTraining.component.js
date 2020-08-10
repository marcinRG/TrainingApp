import React, {useContext} from 'react';
import './LastTraining.component.scss';
import TrainingDetailsComponent from '../trainingDetails/TrainingDetails.component';
import {UserDataContext} from '../../appContext/UserDataContext';

export default function LastTrainingComponent() {

    const userDataContext = useContext(UserDataContext);

    return (
        <div className="last-training-container page-container">
            <h2 className="last-training-title">Last training</h2>
            <TrainingDetailsComponent data={userDataContext.getLastTraining()}/>
        </div>
    );
}
