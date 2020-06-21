import React, {useContext} from 'react';
import './UserInfo.component.scss';
import {AuthContext} from '../../appContext/AuthContext';
import {UserDetailContext} from '../../appContext/UserDetailsContext';

export function UserInfoComponent() {

    const authContext = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);

    return <React.Fragment>
        {authContext.isAuthenticated() &&
        <aside className="user">
            <img className="usr-portrait" src={userDetailsContext.userDetails.imageURL} alt="app user"/>
            <h2 className="usr-title">{userDetailsContext.userDetails.name}</h2>
            <p className="usr-desc">{userDetailsContext.userDetails.motto}</p>
            <ul className="achievement-selected">
                <li className="small-achievement icon-ac-1"></li>
                <li className="small-achievement icon-ac-2"></li>
                <li className="small-achievement icon-ac-3"></li>
            </ul>
        </aside>
        }

    </React.Fragment>
}
