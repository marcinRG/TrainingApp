import './ComboBox.component.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ComboBoxElementComponent} from './ComboBoxElement.component';


export function ComboBoxComponent(props) {
    const [showMenu, setShowMenu] = useState(false);


    const changeSelectedText = (txt) => {
        props.actionSelect(txt);
        setShowMenu(false);
    };

    const showItems = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="combobox-input">
            <div className="inputs">
                <span className='input-text'>{props.selected}</span>
                <button className="input-btn" onClick={showItems}><span className={setIconClass(showMenu)}></span>
                </button>
            </div>
            <ul className={'list-of-elements'} style={setListStyle(showMenu, props.values)}>
                {props.values.map((elem, index) =>
                    <ComboBoxElementComponent key={index} value={elem} action={changeSelectedText}/>)}
            </ul>
        </div>)
}

function setIconClass(rotate) {
    const iconClass = 'icon icon-direction-down';
    if (rotate) {
        return iconClass + ' ' + 'rotate';
    }
    return iconClass;
}


function getHeight(array) {
    return (array.length * 40) + 'px';
}

function setListStyle(show, array) {
    if (show) {
        return {height: getHeight(array)};
    }
    return {height: 0};
}

ComboBoxComponent.propTypes = {
    values: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    actionSelect: PropTypes.func.isRequired
};