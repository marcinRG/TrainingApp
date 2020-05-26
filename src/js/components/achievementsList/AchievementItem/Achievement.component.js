import React from 'react';
import './Achievement.component.scss';
import PropTypes from 'prop-types';

export default function AchievementComponent(props) {
    return (
        <div className="achievement">
            <div className="icon-wrapper"><img src={props.imagePath} alt={props.name}/></div>
            <div className="description-wrapper">
                <h3 className="achievement-name">{props.name}</h3>
                <p className="achievement-date">{getDateString(props.date,'.')}</p>
                <p className="achievement-description">{props.description}</p>
            </div>
        </div>
    );
}

AchievementComponent.propTypes = {
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

function getDateString(dateAsString, separator) {
    if (validDate(dateAsString)) {
        const newDate = new Date(dateAsString);
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate);
        const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(newDate);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate);
        return `${year}${separator}${month}${separator}${day}`;
    }
}

function validDate(dateAsString) {
    return (dateAsString && Date.parse(dateAsString) !== Number.NaN);
}