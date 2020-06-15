import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {MenuComponent} from './js/components/menu/Menu.component';
import {UserInfoComponent} from './js/components/userInfo/UserInfo.component';
import {HashRouter as Router, Route} from 'react-router-dom';
import {AuthProvider} from './js/appContext/AuthContext';
import {AppRoutesComponent} from './js/components/appRoutes/appRoutes.component';

ReactDOM.render(
    <AuthProvider>
        <Router hashType="slash">
            <React.Fragment>
                <MenuComponent/>
                <div className="container">
                    <UserInfoComponent/>
                    <AppRoutesComponent/>
                </div>
            </React.Fragment>
        </Router>
    </AuthProvider>,
    document.getElementById('App'));
