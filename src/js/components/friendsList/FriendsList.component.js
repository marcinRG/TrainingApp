import React, {useState, useContext} from 'react';
import './FriendsList.component.scss';
import FriendComponent from './friendItem/Friend.component';
import {getElementClass} from '../../utilsAndSettings/utils';
import {UserDataContext} from '../../appContext/UserDataContext';

export default function FriendsListComponent() {

    const userDataContext = useContext(UserDataContext);
    const [enableEdit, setEnableEdit] = useState(false);
    const [searchText, setSearchText] = useState('');

    const changeSearchText = (event) => {
        const newValue = event.target.value;
        setSearchText(newValue);
    }

    const clearSearchResults = () => {
        userDataContext.clearUserSearchResults();
        setSearchText('');
    }

    const searchInDataBase = (event) => {
        event.preventDefault();
        userDataContext.searchUsersInDataBase(searchText);
    }

    const changeShowSearch = () => {
        setEnableEdit(!enableEdit);
    };


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
                {(userDataContext.usersSearchResults.length > 0) &&
                <div className="search-results">
                    <h3 className="friends-subtitle">Search results</h3>
                    <div className="friends-list search-results">
                        {userDataContext.usersSearchResults.map((friend, index) =>
                            <FriendComponent key={index} id={index} imgPath={friend.imageURL} userName={friend.name}
                                             userDescription={friend.motto}
                                             achievements={friend.selectedAchievements}
                                             addAction={userDataContext.addFriend}
                            />
                        )}
                    </div>
                    <div className="button-wrapper search-results">
                        {userDataContext.usersSearchResults.length > 0 &&
                        <button className="button" onClick={clearSearchResults}>Clear search results</button>}
                    </div>
                </div>}
            </div>
            <div className={changeFriendsListClass(enableEdit)}>
                <h3 className="friends-subtitle">{enableEdit ? <span>Rearrange / remove friends</span> :
                    <span>My friends</span>}</h3>
                {userDataContext.friends.map((friend, index) =>
                    <FriendComponent key={index} id={index} imgPath={friend.imageURL} userName={friend.name}
                                     userDescription={friend.motto}
                                     achievements={friend.selectedAchievements}
                                     removeAction={userDataContext.removeFriend}
                                     moveDownAction={userDataContext.moveFriendDown}
                                     moveUpAction={userDataContext.moveFriendUp}
                    />
                )}
            </div>
            <div className="button-wrapper summary">
                {enableEdit && <button className="button" onClick={userDataContext.saveUserFriendsToDatabase}>save to
                    database</button>}
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
