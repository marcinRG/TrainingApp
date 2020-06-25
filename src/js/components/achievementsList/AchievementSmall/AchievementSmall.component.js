import React from 'react';
import {achievementsTable} from '../../../data/achievementsTable';
import './AchievementSmall.component.scss';
import PropTypes from 'prop-types';

export default function AchievementSmallComponent(props){

    const imagePath = achievementsTable[props.achievementId].imagePath;
    const title = achievementsTable[props.achievementId].title;

    return (
            <div className={getClassName(props.big)}>
                <img src={imagePath} alt={title} className="image-achievement"/>
                {props.big && <h3 className="achievement-name">{title}</h3>}
            </div>
    )
}

function getClassName(big) {
    let name = 'achievement-small';
    if (big) {
       name = name + ' big';
    }
    return name;
}

AchievementSmallComponent.propTypes = {
    achievementId: PropTypes.string,
    big: PropTypes.bool
};
