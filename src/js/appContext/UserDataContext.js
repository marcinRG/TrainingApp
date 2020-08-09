import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from './AuthContext';
import {firebaseDatabase} from '../data/firebase.database';
import {UserDetailContext} from './UserDetailsContext';
import {arrayPropertiesToObject, objectPropertiesToArray} from '../utilsAndSettings/utils';

export const UserDataContext = React.createContext(null);

export function UserDataProvider(props) {

    const maxNumberOfSelectedAchievements = 3;
    const userAuth = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);

    const [trainings, setTrainings] = useState({});
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

    useEffect(() => {
        if (userAuth.isAuthenticated()) {
            getUserAchievementsFromDatabase();
            getUserFriendsFromDatabase();


        } else {
            setTrainings({});
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
                removeFriend,
                addFriend,
                moveFriendUp,
                moveFriendDown,
                clearUserSearchResults,
                searchUsersInDataBase,
                saveUserFriendsToDatabase,
                changeCheckedAchievement,
                saveUserAchievementsToDatabase
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
