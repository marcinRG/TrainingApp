import React from 'react';
import './AchievementList.component.scss';
import AchievementComponent from './AchievementItem/Achievement.component';
import {achievements} from '../../data/init.data';

export default function AchievementListComponent(props) {
    return (
        <div className="achievements-container page-container">
            <h2 className="achievements-title">Achievements</h2>
            <div className="achievements-list">
                {achievements.map((achievement,index)=>
                    <AchievementComponent key={index} date={achievement.date} description={achievement.description}
                                          imagePath={achievement.imagePath} name={achievement.name}/>
                )}
            </div>
        </div>
    );
}
