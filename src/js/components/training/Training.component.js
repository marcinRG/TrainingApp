import React, {useState, useEffect, useContext} from 'react';
import './Training.component.scss';
import TrainingDetailsComponent from '../trainingDetails/TrainingDetails.component';
import PropTypes from 'prop-types';
import {UserDataContext} from '../../appContext/UserDataContext';
import {objectIsNotEmpty} from '../../utilsAndSettings/utils';

export default function TrainingComponent(props) {
    const userDataContext = useContext(UserDataContext);
    const [training, setTraining] = useState({});

    useEffect(()=>{
        const trainingId = props.match.params.trainingId;
        userDataContext.getUserTraining(trainingId).then((training)=>{
            setTraining(training);
        });

    },[props.match.params.trainingId]);

    return (
        <div className="training-container page-container">
            {objectIsNotEmpty(training) && <React.Fragment>
                <h2 className="training-title">Training from {training.date}</h2>
                <TrainingDetailsComponent data={training} />
            </React.Fragment>}
        </div>
    );
}

TrainingComponent.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            trainingId: PropTypes.string
        })
    })
}



