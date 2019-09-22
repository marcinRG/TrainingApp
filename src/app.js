import style from './app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Menu} from './js/components/menu/Menu';
import {UserInfo} from './js/components/userInfo/UserInfo';

ReactDOM.render(
    <React.Fragment>
        <Menu></Menu>
        <div className="container">
            <UserInfo/>
            <div className="details"></div>
        </div>
    </React.Fragment>,
    document.getElementById('App'));
