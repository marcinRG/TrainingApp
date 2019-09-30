import React from 'react';
import style from './AchievementList.component.scss';
import AchievementComponent from './AchievementItem/Achievement.component';

export default function AchievementListComponent(props) {
    return (
        <div className="achievements-container page-container">
            <h2 className="achievements-title">Achievements</h2>
            <div className="achievements-list">
                <AchievementComponent/>
            </div>
        </div>
    );
}
