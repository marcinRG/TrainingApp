import './ComboBox.component.scss';
import React from 'react';
import PropTypes from 'prop-types';

export function ComboBoxComponent(props) {
        return (
            <div className="combobox-input">
                <label className="input-label">{props.label}</label>
                <div className="inputs">
                    <input type="text" className="input-field"/>
                    <button className="input-btn"><span className="icon-calendar"></span></button>
                </div>
                <ul className="list-of-elements">
                    <li className="list-element">element 1</li>
                    <li className="list-element">element 2</li>
                    <li className="list-element">element 3</li>
                    <li className="list-element">element 4</li>
                    <li className="list-element">element 5</li>
                </ul>
            </div>
        )
}

ComboBoxComponent.propTypes = {
    label: PropTypes.string.isRequired,
};