import style from './Menu.component.scss';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {LinksConstants} from '../../utilsAndSettings/LinkConstants';

export function MenuComponent() {

    const [menuVisible, setVisible] = useState(false);

    return (
        <nav className={setClassName(menuVisible)}>
            <button className="menu-btn" onClick={() => {setVisible(!menuVisible);}}><span>Menu</span></button>
            <ul className="items">
                <li><Link to={LinksConstants.LAST_TRAINING} className="link icon-last-training">Last training</Link></li>
                <li><Link to={LinksConstants.LAST_WEEK} className="link icon-last-week">Last week</Link></li>
                <li><Link to={LinksConstants.HISTORY} className="link icon-history">History</Link></li>
                <li><Link to={LinksConstants.ACHIEVEMENTS} className="link icon-achievements">Achievements</Link></li>
                <li><Link to={LinksConstants.FRIENDS} className="link icon-fiends">Friends</Link></li>
                <li><Link to={LinksConstants.SETTINGS} className="link icon-settings">Settings</Link></li>
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
