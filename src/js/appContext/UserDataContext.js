import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from './AuthContext';
import {firebaseDatabase} from '../data/firebase.database';
import {UserDetailContext} from './UserDetailsContext';
import {arrayPropertiesToObject, objectPropertiesToArray, sortByDateDesc} from '../utilsAndSettings/utils';

export const UserDataContext = React.createContext(null);

export function UserDataProvider(props) {

    const maxNumberOfSelectedAchievements = 3;
    const userAuth = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);

    const [trainings, setTrainings] = useState([]);
    const [achievements, setAchievements] = useState({});
    const [friends, setFriends] = useState([]);
    const [usersSearchResults, setUserSearchResults] = useState([]);

    const getUserAchievementsFromDatabase = () => {
        if (userAuth.user && userAuth.user.uid) {
            firebaseDatabase.getUserAchievements(userAuth.user.uid).then((achievementsObject) => {
                setAchievements(achievementsObject);
            });
        }
    }

    const getUserFriendsFromDatabase = () => {
        if (userAuth.user.uid) {
            firebaseDatabase.getFriendsList(userAuth.user.uid).then(friendsList => {
                setFriends(objectPropertiesToArray(friendsList));
            });
        }
    }

    const saveUserFriendsToDatabase = () => {
        if (userAuth.user.uid) {
            const friendsObject = arrayPropertiesToObject(friends);
            firebaseDatabase.saveFriendsList(userAuth.user.uid, friendsObject);
        }
    }

    const getUserTrainingsFromDataBase = () => {
        if (userAuth.user.uid) {
            firebaseDatabase.getNLastsTraining(userAuth.user.uid, 7).then(trainings => {
                setTrainings((Object.values(trainings)).sort(sortByDateDesc));
            });
        }
    }

    const getUserTrainingsFromDataBaseInTimeSpan = (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            if (userAuth.user.uid) {
                firebaseDatabase.getTrainingsInTimeSpan(userAuth.user.uid, startDate, endDate).then(trainings => {
                    resolve(trainings);
                }).catch((error) => {
                   reject(error);
                });
            } else {
                reject(new Error('Auth error'));
            }
        });
    }

    const getUserTraining = (trainingID) => {
        return new Promise((resolve, reject) => {
            if (userAuth.user.uid) {
                firebaseDatabase.getTraining(userAuth.user.uid, trainingID).then(training => {
                    resolve(training);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                reject(new Error('Auth error'));
            }
        });
    }

    const getLastTraining = () => {
        if (Array.isArray(trainings) && trainings.length > 0) {
            return trainings[0];
        }
        return null;
    }

    const removeFriend = (id) => {
        const newState = [...friends];
        newState.splice(id, 1);
        setFriends(newState);
    }

    const addFriend = (id) => {
        const newUser = {...usersSearchResults[id]};
        const newState = [...friends];
        newState.push(newUser);
        setFriends(newState);
    }

    const moveFriendUp = (id) => {
        if (id > 0) {
            const item = {...friends[id]};
            const newState = [...friends];
            newState.splice(id, 1);
            newState.splice(id - 1, 0, item);
            setFriends(newState);
        }
    }

    const moveFriendDown = (id) => {
        if (id + 1 < friends.length) {
            const item = {...friends[id]};
            const newState = [...friends];
            newState.splice(id, 1);
            newState.splice(id + 1, 0, item);
            setFriends(newState);
        }
    }

    const clearUserSearchResults = () => {
        setUserSearchResults([]);
    }

    const searchUsersInDataBase = (searchText) => {
        firebaseDatabase.getUsers(searchText).then((value) => {
            setUserSearchResults(objectPropertiesToArray(value));
        });
    }

    const saveUserAchievementsToDatabase = () => {
        if (userAuth.user && userAuth.user.uid) {
            userDetailsContext.changeSelectedAchievements(getSelectedAchievements(achievements));
            firebaseDatabase.saveSelectedAchievements(userAuth.user.uid, achievements, getSelectedAchievements(achievements));
        }
    }

    const saveUserTrainingToDatabase = (trainingData) => {
        if (userAuth.user && userAuth.user.uid) {
            firebaseDatabase.addTraining(userAuth.user.uid, trainingData).then(() => {
                getUserTrainingsFromDataBase();
            });
        }
    }

    const changeCheckedAchievement = (id) => {
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

    const getLastTrainingSummary = () => {
        return getMaxFromValues(getLastTraining());
    }

    const getLastWeekTrainingSummary = () => {
        let sumObject = {
            calories: 0, distance: 0, heartbeat: 0
        }
        trainings.forEach(training => {
            let tempObj = getMaxFromValues(training);
            sumObject.calories = sumObject.calories + tempObj.calories;
            sumObject.distance = sumObject.distance + tempObj.distance;
            if (tempObj.heartbeat > sumObject.heartbeat) {
                sumObject.heartbeat = tempObj.heartbeat;
            }
        });
        return sumObject;
    }

    const getLastWeekTrainings = () => {
        const lastWeekTrainingsSummary = {};
        trainings.forEach(training => {
            lastWeekTrainingsSummary[training.date] = getMaxFromValues(training);
        });
        return lastWeekTrainingsSummary;
    }


    useEffect(() => {
        if (userAuth.isAuthenticated()) {
            getUserAchievementsFromDatabase();
            getUserFriendsFromDatabase();
            getUserTrainingsFromDataBase();

        } else {
            setTrainings([]);
            setAchievements({});
            setFriends([]);
        }
    }, [userAuth.user.uid]);


    return (
        <UserDataContext.Provider
            value={{
                achievements,
                friends,
                usersSearchResults,
                trainings,
                getLastTraining,
                getUserTraining,
                getLastTrainingSummary,
                getLastWeekTrainingSummary,
                getLastWeekTrainings,
                removeFriend,
                addFriend,
                moveFriendUp,
                moveFriendDown,
                clearUserSearchResults,
                searchUsersInDataBase,
                saveUserFriendsToDatabase,
                changeCheckedAchievement,
                saveUserAchievementsToDatabase,
                saveUserTrainingToDatabase,
                getUserTrainingsFromDataBaseInTimeSpan
            }}>
            {props.children}
        </UserDataContext.Provider>
    )

}

UserDataProvider.propTypes = {
    children: PropTypes.any,
};

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

export function getSelectedAchievements(achievements) {
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

function getMaxValueFromArrayField(object, fieldName) {
    let max = -10;
    if (object) {
        if (object.hasOwnProperty(fieldName) && Array.isArray(object[fieldName])) {
            const tempArray = object[fieldName];
            tempArray.forEach(elem => {
                if (elem['y'] > max) {
                    max = elem['y'];
                }
            });
        }
    }
    return max;
}

function getMaxFromValues(object) {
    if (object && object.hasOwnProperty('values')) {
        return {
            calories: getMaxValueFromArrayField(object.values, 'calories'),
            distance: getMaxValueFromArrayField(object.values, 'distance'),
            heartbeat: getMaxValueFromArrayField(object.values, 'heartbeat')
        }
    }
}
