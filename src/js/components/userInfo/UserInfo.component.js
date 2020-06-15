import React, {useContext} from 'react';
import imgPath from './../../../images/client2.jpg';
import './UserInfo.component.scss';
import {AuthContext} from '../../appContext/AuthContext';

export function UserInfoComponent() {

    const authContext = useContext(AuthContext);

    return <React.Fragment>
        {authContext.isAuthenticated &&
        <aside className="user">
            <img className="usr-portrait" src={imgPath} alt="app user"/>
            <h2 className="usr-title">Graham Doe</h2>
            <p className="usr-desc"> I can survive a car crash. I might look a little different but I assure you
                that I&apos;m human.</p>
            <ul className="achievement-selected">
                <li className="small-achievement icon-ac-1"></li>
                <li className="small-achievement icon-ac-2"></li>
                <li className="small-achievement icon-ac-3"></li>
            </ul>
        </aside>
        }

    </React.Fragment>
}
