import React from 'react';
import './LastAchievement.component.scss';
import AchievementSmallComponent from '../achievementsList/AchievementSmall/AchievementSmall.component';

const tempAchievements = {
    '-MB_Y2izDmn73JQOSIcu': { achievementID: 'a06', date: '2012-08-25', selected: true },
    '-MB_YGOoMkVoahvd-_eS': { achievementID: 'a26', date: '2017-04-11', selected: true },
    '-MB__Kz577PNlfHM3WGs': { achievementID: 'a16', date: '2018-01-22', selected: true },
    '-MB__YoSb7RYa82vTjrA': { achievementID: 'a21', date: '2019-09-22', selected: false },
    '-MB__hRxe1mtyjyt1VHY': { achievementID: 'a30', date: '2002-03-17', selected: false },
    '-MB_aTAhMvhY0H0-eBQT': { achievementID: 'a13', date: '2020-01-01', selected: false }
};


export function LastAchievementsComponent(props) {
    return (
        <div className="last-achievements-component">
            <h3 className="achievement-subtitle">Your&apos;s last achievements</h3>
            <div className="achievement-list-wrapper">{
                (Object.values(tempAchievements).slice(3)).map((achievement, index) =>
                    <AchievementSmallComponent key={index} date={achievement.date} showDate={true} achievementId={achievement.achievementID} big={true} />)
            }</div>
        </div>
    )
}
