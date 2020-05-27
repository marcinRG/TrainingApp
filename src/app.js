import './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {MenuComponent} from './js/components/menu/Menu.component';
import {UserInfoComponent} from './js/components/userInfo/UserInfo.component';
import {store} from './js/reduxSettings/store';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import LastTrainingComponent from './js/components/lastTraining/LastTraining.component';
import LastWeekComponent from './js/components/lastWeek/LastWeek.component';
import FriendsListComponent from './js/components/friendsList/FriendsList.component';
import AchievementListComponent from './js/components/achievementsList/AchivementList.component';
import HistoryComponent from './js/components/history/History.component';
import SettingsComponent from './js/components/settings/Settings.component';
import {LinksConstants} from './js/utilsAndSettings/LinkConstants';
import HomePageComponent from './js/components/homePage/HomePage.component';
import InfoPageComponent from './js/components/infoPage/InfoPage.component';

ReactDOM.render(
    <Provider store={store}>
        <Router hashType="slash">
            <React.Fragment>
                <MenuComponent/>
                <div className="container">
                    <UserInfoComponent/>
                    <div className="details">
                        <Route exact={true} path="/" component={HomePageComponent}/>
                        <Route path={LinksConstants.LAST_WEEK + '/'} component={LastWeekComponent}/>
                        <Route path={LinksConstants.ACHIEVEMENTS + '/'} component={AchievementListComponent}/>
                        <Route path={LinksConstants.LAST_TRAINING + '/'} component={LastTrainingComponent}/>
                        <Route path={LinksConstants.HISTORY + '/'} component={HistoryComponent}/>
                        <Route path={LinksConstants.FRIENDS + '/'} component={FriendsListComponent}/>
                        <Route path={LinksConstants.SETTINGS + '/'} component={SettingsComponent}/>
                        <Route path={LinksConstants.INFO + '/'} component={InfoPageComponent}/>
                    </div>
                </div>
            </React.Fragment>
        </Router>
    </Provider>,
    document.getElementById('App'));
