import React, {useState, useEffect} from 'react';
import './AchievementList.component.scss';
import AchievementComponent from './AchievementItem/Achievement.component';
import AchievementSmallComponent from './AchievementSmall/AchievementSmall.component';

const maxNumberOfSelectedAchievements = 3;
export default function AchievementListComponent(props) {
    const [editSelected, setEditSelected] = useState(false);
    const [achievements, setAchievements] = useState([
        {
            date: '2020-05-11',
            achievementID: 'a01',
            selected: true,
        },

        {
            date: '2019-04-22',
            achievementID: 'a30',
            selected: false
        },
        {
            date: '2012-09-23',
            achievementID: 'a18',
            selected: true
        },
        {
            date: '2016-06-22',
            achievementID: 'a28',
            selected: false
        },
        {
            date: '2020-05-11',
            achievementID: 'a08',
            selected: true
        },
        {
            date: '2020-05-11',
            achievementID: 'a12',
            selected: false
        },
        {
            date: '2020-05-11',
            achievementID: 'a23',
            selected: false
        }

    ]);

    const changeCheckedElem = (id) => {
        const newState = [...achievements];
        if (achievements[id].selected === true) {
            newState[id].selected = !achievements[id].selected;

        } else {
            if (countSelectedAchievements(achievements) >= maxNumberOfSelectedAchievements) {
                const first = getFirstSelected(achievements);
                if (first >= 0) {
                    newState[first].selected = false;
                }
            }
            newState[id].selected = true;
        }
        setAchievements(newState);
    }


    const changeSetSelected = () => {
        setEditSelected(!editSelected);
    }

    // useEffect(() => {
    //     console.log(achievements);
    // }, []);

    return (
        <div className="achievements-container page-container">
            <h2 className="achievements-title">Achievements</h2>
            <h3 className="achievements-subtitle">Selected achievements</h3>
            <div className="selected-achievements-wrapper">
                {(getSelectedAchievements(achievements, maxNumberOfSelectedAchievements)).map((achievement, index) =>
                    <AchievementSmallComponent key={index} big={true} achievementId={achievement.achievementID}></AchievementSmallComponent>
                )}
            </div>
            <div className="button-wrapper">
                <button className="button" onClick={changeSetSelected}>Edit selected achievements</button>
                <button className="button">Save all changes</button>
            </div>
            <h3 className="achievements-subtitle">All won achievements</h3>
            <div className="achievements-list">
                {achievements.map((achievement, index) =>
                    <AchievementComponent key={index} id={index} achievementId={achievement.achievementID}
                                          selected={achievement.selected}
                                          date={achievement.date} showEdit={editSelected}
                                          changeCheckedAction={changeCheckedElem}/>
                )}
            </div>
        </div>
    );
}

function countSelectedAchievements(achievements) {
    return achievements.filter((elem) => {
        return elem.selected;
    }).length;
}

function getFirstSelected(achievements) {
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].selected) {
            return i;
        }
    }
    return -1;
}

function getSelectedAchievements(achievements, max) {
    const maxElements = achievements.length < max ? achievements.length : max;
    return achievements.filter((elem) => {
        return elem.selected;
    }).slice(0, max);
}
