import React, {useContext} from 'react';
import './LastAchievement.component.scss';
import AchievementSmallComponent from '../achievementsList/AchievementSmall/AchievementSmall.component';
import {UserDataContext} from '../../appContext/UserDataContext';


export function LastAchievementsComponent() {
    const userDataContext = useContext(UserDataContext);
    const lastAchievementsArray = getLatestAchievements(userDataContext.achievements, 3);

    return (
        <React.Fragment>
            {
                lastAchievementsArray.length > 0 &&
                <div className="last-achievements-component">
                    <h3 className="achievement-subtitle">Your last achievements</h3>
                    <div className="achievement-list-wrapper">
                        {
                            (lastAchievementsArray).map((achievement, index) =>
                                <AchievementSmallComponent key={index} date={achievement.date} showDate={true}
                                                           achievementId={achievement.achievementID} big={true}/>)
                        }
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

function getLatestAchievements(achievementObject, count) {
    return (Object.values(achievementObject)).sort((value1, value2) => {
        if (value1.date > value2.date) {
            return -1;
        }
        if (value1.date < value2.date) {
            return 1;
        }
        return 0;
    }).slice(0, count);

}
