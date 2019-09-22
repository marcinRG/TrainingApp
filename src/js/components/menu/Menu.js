import style from './Menu.scss';
import React, {useState} from 'react';

export function Menu() {

    const [menuVisible, setVisible] = useState(false);

    return (
        <nav className={setClassName(menuVisible)}>
            <button className="menu-btn" onClick={() => {setVisible(!menuVisible);}}><span>Menu</span></button>
            <ul className="items">
                <li><a href="#/last-training" className="link icon-last-training">Last training</a></li>
                <li><a href="#/last-week" className="link icon-last-week">Last week</a></li>
                <li><a href="#/achievements" className="link icon-achievements">Achievements</a></li>
                <li><a href="#/" className="link icon-history">History</a></li>
                <li><a href="#/friends" className="link icon-fiends">Friends</a></li>
                <li><a href="#/settings" className="link icon-settings">Settings</a></li>
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
