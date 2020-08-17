import React from 'react';
import PropTypes from 'prop-types';
import './TrainingSummary.component.scss';
import {Link} from 'react-router-dom';


export function TrainingSummaryComponent(props) {
    return (
        <div className="training-summary-component">
            {props.data && <React.Fragment>
                <h3 className="summary-title">{props.title}</h3>
                <table className="summary-table">
                    <tbody>
                    <tr>
                        <td>Calories burned:</td>
                        <td>{props.data.calories}</td>
                    </tr>
                    <tr>
                        <td>Distance:</td>
                        <td>{props.data.distance}</td>
                    </tr>
                    <tr>
                        <td>Max heart rate:</td>
                        <td>{props.data.heartbeat}</td>
                    </tr>
                    </tbody>
                </table>
                <Link to={props.link + '/'} className="summary-link">see more ...</Link>
            </React.Fragment>}
        </div>
    )
}

TrainingSummaryComponent.propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    calories: PropTypes.string,
    distance: PropTypes.string,
    heartbeatRate: PropTypes.string,
    link: PropTypes.string
}
