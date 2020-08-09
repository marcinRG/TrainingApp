import React, {useState, useContext} from 'react';
import './AchievementList.component.scss';
import AchievementComponent from './AchievementItem/Achievement.component';
import AchievementSmallComponent from './AchievementSmall/AchievementSmall.component';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';
import {getSelectedAchievements, UserDataContext} from '../../appContext/UserDataContext';

export default function AchievementListComponent() {

    const userDataContext = useContext(UserDataContext);
    const [editSelected, setEditSelected] = useState(false);

    const changeSetSelected = () => {
        setEditSelected(!editSelected);
    }

    return (
        <div className="achievements-container page-container">
            <h2 className="achievements-title">Achievements</h2>
            <h3 className="achievements-subtitle">Selected achievements</h3>
            <div className="selected-achievements-wrapper">
                {objectPropertiesToArray(getSelectedAchievements(userDataContext.achievements)).map((achievement, index) =>
                    <AchievementSmallComponent key={index} big={true}
                                               achievementId={achievement.achievementID}></AchievementSmallComponent>
                )}
            </div>
            <div className="button-wrapper">
                <button className="button" onClick={changeSetSelected}>Edit selected achievements</button>
                <button className="button" onClick={userDataContext.saveUserAchievementsToDatabase}>Save all changes
                </button>
            </div>
            <h3 className="achievements-subtitle">All won achievements</h3>
            <div className="achievements-list">
                {renderAchievements(userDataContext.achievements, userDataContext.changeCheckedAchievement, editSelected)}
            </div>
        </div>
    );
}

function renderAchievements(achievements, changeAction, showEdit) {
    const results = [];
    const keys = Object.keys(achievements);
    keys.forEach((keyA) => {
        const achievement = achievements[keyA];
        results.push(<AchievementComponent key={keyA} date={achievement.date} selected={achievement.selected}
                                           achievementId={achievement.achievementID}
                                           showEdit={showEdit} id={keyA} changeCheckedAction={changeAction}/>);
    });
    return (results);
}
