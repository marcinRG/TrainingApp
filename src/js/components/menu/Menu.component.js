import './Menu.component.scss';
import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {LinksConstants} from '../../utilsAndSettings/LinkConstants';
import {AuthContext} from '../../appContext/AuthContext';

export function MenuComponent() {

    const [menuVisible, setVisible] = useState(false);
    const authContext = useContext(AuthContext);
    const logOutAction = () => {
        authContext.logOut();
    }

    return (
        <nav className={setClassName(menuVisible)}>
            <button className="menu-btn" onClick={() => {setVisible(!menuVisible);}}><span>Menu</span></button>
            <ul className="items">

                <li><Link to={'/'} className="link icon-home-page">Home page</Link></li>
                <li><Link to={LinksConstants.LAST_TRAINING} className="link icon-last-training">Last training</Link></li>
                <li><Link to={LinksConstants.LAST_WEEK} className="link icon-last-week">Last week</Link></li>
                <li><Link to={LinksConstants.HISTORY} className="link icon-history">History</Link></li>
                <li><Link to={LinksConstants.ACHIEVEMENTS} className="link icon-achievements">Achievements</Link></li>
                <li><Link to={LinksConstants.FRIENDS} className="link icon-fiends">Friends</Link></li>
                <li><Link to={LinksConstants.SETTINGS} className="link icon-settings">Settings</Link></li>
                <li><Link to={LinksConstants.INFO} className="link icon-info">Info</Link></li>
                <li><span onClick={logOutAction} className="link icon-sign-out">Log out</span></li>
            </ul>
        </nav>
    );
}

function setClassName(visble) {
    if (visble) {
        return 'menu show';
    }
    return 'menu';
}
