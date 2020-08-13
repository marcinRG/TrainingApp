import React, {useState, useEffect} from 'react';
import TrainingDetailsComponent from '../trainingDetails/TrainingDetails.component';
import PropTypes from 'prop-types';

export default function TrainingComponent(props) {
    const [training, setTraining] = useState({});

    useEffect(()=>{
        console.log('use Effect training component');
        console.log(props.match.params.trainingId);

    },[props.match.params.trainingId]);

    return (
        <div className="training-container page-container">
            <h2 className="training-title">Training from </h2>
            {/*<TrainingDetailsComponent data={userDataContext.getLastTraining()}/>*/}
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

