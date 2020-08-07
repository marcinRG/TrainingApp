import React from 'react';
import PropTypes from 'prop-types';
import './trainingSummary.component.scss';


export function TrainingSummaryComponent(props) {
    return (
        <div className="training-summary-component">
            <h3 className="summary-title">{props.title}</h3>
            <table className="summary-table">
                <tbody>
                <tr>
                    <td>Calories burned:</td>
                    <td>{props.calories}</td>
                </tr>
                <tr>
                    <td>Distance:</td>
                    <td>{props.distance}</td>
                </tr>
                <tr>
                    <td>Max heart rate:</td>
                    <td>{props.heartbeatRate}</td>
                </tr>
                </tbody>
            </table>
            <a href="#" className="summary-link">see more ...</a>
        </div>
    )
}

TrainingSummaryComponent.propTypes = {
    title: PropTypes.string,
    calories: PropTypes.string,
    distance: PropTypes.string,
    heartbeatRate: PropTypes.string
}