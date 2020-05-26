import React from 'react';
import './FriendsList.component.scss';
import FriendComponent from './friendItem/Friend.component';
import {friends} from '../../data/init.data';

export default function FriendsListComponent(props) {
    return (
        <div className="friends-container page-container">
            <h2 className="friends-title">Friends</h2>
            <div className="friends-list">
                {friends.map((friend, index) =>
                    <FriendComponent key={index} imgPath={friend.imagePath} userName={friend.nick}
                                     userDescription={friend.shortDescription}
                                     achievements={friend.selectedAchievements}/>
                )}
            </div>
        </div>
    );
}
