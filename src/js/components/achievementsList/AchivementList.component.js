import React, {useState, useEffect, useContext} from 'react';
import './AchievementList.component.scss';
import AchievementComponent from './AchievementItem/Achievement.component';
import AchievementSmallComponent from './AchievementSmall/AchievementSmall.component';
import {AuthContext} from '../../appContext/AuthContext';
import {firebaseDatabase} from '../../data/firebase.database';
import {UserDetailContext} from '../../appContext/UserDetailsContext';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';

const maxNumberOfSelectedAchievements = 3;
export default function AchievementListComponent() {

    const userAuth = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);
    const [editSelected, setEditSelected] = useState(false);
    const [achievements, setAchievements] = useState({});

    useEffect(() => {
        if (userAuth.user && userAuth.user.uid) {
            firebaseDatabase.getUserAchievements(userAuth.user.uid).then((achievementsObject) => {
                console.log(achievementsObject);
                setAchievements(achievementsObject);
            });
        }
    }, []);

    const changeCheckedElem = (id) => {
        const newState = {...achievements};
        if (achievements[id].selected === true) {
            newState[id].selected = !achievements[id].selected;
        } else {
            if (countSelectedAchievements(achievements) >= maxNumberOfSelectedAchievements) {
                const first = getFirstSelected(achievements);
                if (first) {
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

    const saveChangesToDatabase = () => {
        if (userAuth.user && userAuth.user.uid) {
            userDetailsContext.changeSelectedAchievements(getSelectedAchievements(achievements));
            firebaseDatabase.saveSelectedAchievements(userAuth.user.uid, achievements,getSelectedAchievements(achievements));
        }
    }


    return (
        <div className="achievements-container page-container">
            <h2 className="achievements-title">Achievements</h2>
            <h3 className="achievements-subtitle">Selected achievements</h3>
            <div className="selected-achievements-wrapper">
                {objectPropertiesToArray(getSelectedAchievements(achievements)).map((achievement, index) =>
                    <AchievementSmallComponent key={index} big={true}
                                               achievementId={achievement.achievementID}></AchievementSmallComponent>
                )}
            </div>
            <div className="button-wrapper">
                <button className="button" onClick={changeSetSelected}>Edit selected achievements</button>
                <button className="button" onClick={saveChangesToDatabase}>Save all changes</button>
            </div>
            <h3 className="achievements-subtitle">All won achievements</h3>
            <div className="achievements-list">
                {renderAchievements(achievements, changeCheckedElem, editSelected)}
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

function countSelectedAchievements(achievements) {
    return Object.values(achievements).filter((elem) => {
        return elem.selected;
    }).length;
}

function getFirstSelected(achievements) {
    const keys = Object.keys(achievements);
    for (let i = 0; i < keys.length; i++) {
        if (achievements[keys[i]].selected) {
            return keys[i];
        }
    }
    return null;
}

function getSelectedAchievements(achievements) {
    const objectCopy = {};
    for (const prop in achievements) {
        if (achievements.hasOwnProperty(prop)) {
            if (achievements[prop].selected === true) {
                objectCopy[prop] = achievements[prop]
            }
        }
    }
    return objectCopy;
}

