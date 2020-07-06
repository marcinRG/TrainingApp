import React, {useState} from 'react';
import './FriendsList.component.scss';
import FriendComponent from './friendItem/Friend.component';
import {friends} from '../../data/init.data';
import {getElementClass} from '../../utilsAndSettings/utils';

export default function FriendsListComponent(props) {

    const [enableEdit, setEnableEdit] = useState(false);
    const [friendsList, setFriendsList] = useState(friends);
    const [usersSearchResults, setUserSearchResults] = useState([]);
    const [searchText, setSearchText] = useState('');

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
        const newState = friends.filter((elem)=> {
            return elem.nick.toUpperCase().includes(searchText.toUpperCase());
        });
        setUserSearchResults(newState);
    }

    const saveInDataBase = () => {
        console.log('save in database');
    }

    const changeShowSearch = (event) => {
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
                    <input className="input-text" type="text" placeholder="find new friends" onChange={changeSearchText} value={searchText}/>
                    <button className="button" onClick={searchInDataBase}>Find</button>
                </form>
                <div className="search-results">
                    <div className="friends-list search-results">
                        {usersSearchResults.map((friend, index) =>
                            <FriendComponent key={index} id={index} imgPath={friend.imagePath} userName={friend.nick}
                                             userDescription={friend.shortDescription}
                                             achievements={friend.selectedAchievements}
                                             addAction={addFriend}
                            />
                        )}
                    </div>
                    <div className="button-wrapper search-results">
                        {usersSearchResults.length > 0 && <button className="button" onClick={clearSearchResults}>Clear search results</button>}
                    </div>
                </div>
            </div>
            <div className={changeFriendsListClass(enableEdit)}>
                {friendsList.map((friend, index) =>
                    <FriendComponent key={index} id={index} imgPath={friend.imagePath} userName={friend.nick}
                                     userDescription={friend.shortDescription}
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
