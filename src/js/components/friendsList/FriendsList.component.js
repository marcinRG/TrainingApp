import React, {useState, useEffect, useContext} from 'react';
import './FriendsList.component.scss';
import FriendComponent from './friendItem/Friend.component';
import {arrayPropertiesToObject, getElementClass, objectPropertiesToArray} from '../../utilsAndSettings/utils';
import {firebaseDatabase} from '../../data/firebase.database';
import {AuthContext} from '../../appContext/AuthContext';

export default function FriendsListComponent(props) {

    const [enableEdit, setEnableEdit] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [usersSearchResults, setUserSearchResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const userAuth = useContext(AuthContext);

    useEffect(() => {
        if (userAuth.user.uid) {
            firebaseDatabase.getFriendsList(userAuth.user.uid).then(friendsList => {
                setFriendsList(objectPropertiesToArray(friendsList));
            });
        }
    }, []);


    const changeSearchText = (event) => {
        const newValue = event.target.value;
        setSearchText(newValue);
    }

    const clearSearchResults = () => {
        setUserSearchResults([]);
        setSearchText('');
    }

    const searchInDataBase = (event) => {
        event.preventDefault();
        firebaseDatabase.getUsers(searchText).then((value) => {
            setUserSearchResults(objectPropertiesToArray(value));
        });
    }

    const saveInDataBase = () => {
        if (userAuth.user.uid) {
            const friendsObject = arrayPropertiesToObject(friendsList);
            firebaseDatabase.saveFriendsList(userAuth.user.uid, friendsObject);
        }
    }

    const changeShowSearch = () => {
        setEnableEdit(!enableEdit);
    };

    const removeFriend = (id) => {
        const newState = [...friendsList];
        newState.splice(id, 1);
        setFriendsList(newState);
    }

    const addFriend = (id) => {
        const newUser = {...usersSearchResults[id]};
        const newState = [...friendsList];
        newState.push(newUser);
        setFriendsList(newState);
    }

    const moveFriendUp = (id) => {
        if (id > 0) {
            const item = {...friendsList[id]};
            const newState = [...friendsList];
            newState.splice(id, 1);
            newState.splice(id - 1, 0, item);
            setFriendsList(newState);
        }
    }

    const moveFriendDown = (id) => {
        if (id + 1 < friendsList.length) {
            const item = {...friendsList[id]};
            const newState = [...friendsList];
            newState.splice(id, 1);
            newState.splice(id + 1, 0, item);
            setFriendsList(newState);
        }
    }


    return (
        <div className="friends-container page-container">
            <h2 className="friends-title">Friends</h2>
            <div className="button-wrapper">
                <button className="button" onClick={changeShowSearch}>Edit/change friend&apos;s list</button>
            </div>
            <div className={changeSearchClass(enableEdit)}>
                <form className="search-friend-form">
                    <h3 className="friends-subtitle">Find new friends</h3>
                    <input className="input-text" type="text" placeholder="find new friends" onChange={changeSearchText}
                           value={searchText}/>
                    <button className="button" onClick={searchInDataBase}>Find</button>
                </form>
                {(usersSearchResults.length > 0) &&
                <div className="search-results">
                    <h3 className="friends-subtitle">Search results</h3>
                    <div className="friends-list search-results">
                        {usersSearchResults.map((friend, index) =>
                            <FriendComponent key={index} id={index} imgPath={friend.imageURL} userName={friend.name}
                                             userDescription={friend.motto}
                                             achievements={friend.selectedAchievements}
                                             addAction={addFriend}
                            />
                        )}
                    </div>
                    <div className="button-wrapper search-results">
                        {usersSearchResults.length > 0 &&
                        <button className="button" onClick={clearSearchResults}>Clear search results</button>}
                    </div>
                </div>}
            </div>
            <div className={changeFriendsListClass(enableEdit)}>
                <h3 className="friends-subtitle">{enableEdit ? <span>Rearrange / remove friends</span> :
                    <span>My friends</span>}</h3>
                {friendsList.map((friend, index) =>
                    <FriendComponent key={index} id={index} imgPath={friend.imageURL} userName={friend.name}
                                     userDescription={friend.motto}
                                     achievements={friend.selectedAchievements}
                                     removeAction={removeFriend} moveDownAction={moveFriendDown}
                                     moveUpAction={moveFriendUp}
                    />
                )}
            </div>
            <div className="button-wrapper summary">
                {enableEdit && <button className="button" onClick={saveInDataBase}>save to database</button>}
            </div>
        </div>
    );
}

function changeSearchClass(booleanValue) {
    return getElementClass(booleanValue, 'search-wrapper', 'visible');
}

function changeFriendsListClass(booleanValue) {
    return getElementClass(booleanValue, 'friends-list', 'editable');
}
