import React from 'react';
import './Achievement.component.scss';
import PropTypes from 'prop-types';
import {achievementsTable} from '../../../data/achievementsTable'

export default function AchievementComponent(props) {
    const achievementData = achievementsTable[props.achievementId];
    const changeChecked = () => {
        props.changeCheckedAction(props.id);
    }
    return (
        <div className="achievement">
            <div className="icon-wrapper"><img src={achievementData.imagePath} alt={achievementData.title}/></div>
            <div className="description-wrapper">
                <h3 className="achievement-name">{achievementData.title}</h3>
                <p className="achievement-date">{props.date}</p>
                <p className="achievement-description">{achievementData.description}</p>
            </div>
            {props.showEdit &&
            <div className="select-wrapper">
                <span className={setCheckedClass(props.selected)} onClick={changeChecked}/>
            </div>}
        </div>
    );
}

AchievementComponent.propTypes = {
    achievementId: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    date: PropTypes.string.isRequired,
    showEdit: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    changeCheckedAction: PropTypes.func.isRequired
};

function setCheckedClass(checked) {
    let className = 'icon';
    if (checked) {
        return className + ' icon-checked'
    }
    return className + ' icon-unchecked';
}

