import React from 'react';
import {days, daysShort} from '../../data/monthAndDaysTables';
import {PropTypes} from 'prop-types';

export function DayHeaderRowComponent(props) {
    return (
        <tr>
            {(getDaysTable(props.isDaysShort)).map((day, index) =>
                <td key={index} className={props.cellClassName}>{day}</td>
            )}
        </tr>
    );
}

DayHeaderRowComponent.propTypes = {
    cellClassName: PropTypes.string.isRequired,
    isDaysShort: PropTypes.bool.isRequired
}

function getDaysTable(isDaysShort) {
    if (isDaysShort) {return daysShort}
    return days;
}
