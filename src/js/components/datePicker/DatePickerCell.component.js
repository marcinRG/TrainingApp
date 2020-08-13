import React from 'react';
import PropTypes from 'prop-types';
import {getElementClass} from '../../utilsAndSettings/utils';
import {Link} from 'react-router-dom';

export function DatePickerCellComponent(props) {
    return (
        <td className={setClass(props)}>
            {props.link ? <Link to={props.link}>{props.value}</Link> : <span>{props.value}</span>}
        </td>
    );
}

function setClass(props) {
    let className = props.cellClass;
    if (props.isEnabled) {
        className = className + ' ' + 'enabled';
        if (props.link) {
            className = className + ' ' + 'link';
        }
    }
    return className;
}

DatePickerCellComponent.propTypes = {
    value: PropTypes.number.isRequired,
    cellClass: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    link: PropTypes.string
}
