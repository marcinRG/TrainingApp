import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {MenuComponent} from './js/components/menu/Menu.component';
import {UserInfoComponent} from './js/components/userInfo/UserInfo.component';
import {HashRouter as Router} from 'react-router-dom';
import {AuthProvider} from './js/appContext/AuthContext';
import {AppRoutesComponent} from './js/components/appRoutes/appRoutes.component';
import {UserDetailsProvider} from './js/appContext/UserDetailsContext';
import {UserDataProvider} from './js/appContext/UserDataContext';

ReactDOM.render(
    <AuthProvider>
        <Router hashType="slash">
            <React.Fragment>
                <MenuComponent/>
                <div className="app-container">
                    <UserDetailsProvider>
                        <UserDataProvider>
                            <UserInfoComponent/>
                            <AppRoutesComponent/>
                        </UserDataProvider>
                    </UserDetailsProvider>
                </div>
            </React.Fragment>
        </Router>
    </AuthProvider>,
    document.getElementById('App'));
