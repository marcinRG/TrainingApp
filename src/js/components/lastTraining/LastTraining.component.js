import React, {useContext} from 'react';
import './LastTraining.component.scss';
import TrainingDetailsComponent from '../trainingDetails/TrainingDetails.component';
import {UserDataContext} from '../../appContext/UserDataContext';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';

export default function LastTrainingComponent() {

    const userDataContext = useContext(UserDataContext);
    return (
        <div className="last-training-container page-container">
            <h2 className="last-training-title">Last training</h2>
            <TrainingDetailsComponent data={getLastTraining(userDataContext.trainings)}/>
        </div>
    );
}

function getLastTraining(trainings) {
    const trainingsArray = objectPropertiesToArray(trainings);
    if (trainingsArray.length>0) {
        return trainingsArray[0];
    }
    return null;
}
