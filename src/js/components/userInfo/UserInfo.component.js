import React, {useContext} from 'react';
import './UserInfo.component.scss';
import {AuthContext} from '../../appContext/AuthContext';
import {UserDetailContext} from '../../appContext/UserDetailsContext';
import AchievementSmallComponent from '../achievementsList/AchievementSmall/AchievementSmall.component';
import {objectPropertiesToArray} from '../../utilsAndSettings/utils';

export function UserInfoComponent() {

    const authContext = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);

    return (<React.Fragment>
        {authContext.isAuthenticated() &&
        <aside className="user">
            <img className="usr-portrait" src={userDetailsContext.userDetails.imageURL} alt="app user"/>
            <h2 className="usr-title">{userDetailsContext.userDetails.name}</h2>
            <p className="usr-desc">{userDetailsContext.userDetails.motto}</p>
            <ul className="achievement-selected">
                {objectPropertiesToArray(userDetailsContext.userDetails.selectedAchievements).map((elem, index) =>
                    <AchievementSmallComponent key={index} achievementId={elem.achievementID} />
                )}
            </ul>
        </aside>
        }
    </React.Fragment>)
}


