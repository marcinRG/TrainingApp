import React from 'react';
import PropTypes from 'prop-types';
import {getElementClass} from '../../utilsAndSettings/utils';

export function DatePickerCellComponent(props) {
    return (
        <td className={setClass(props)}>{props.value}</td>
    );
}

function setClass(props) {
    return getElementClass(props.isEnabled, props.cellClass, 'enabled');
}

DatePickerCellComponent.propTypes = {
    value: PropTypes.number.isRequired,
    cellClass: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired
}
