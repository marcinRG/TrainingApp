import React, {useContext} from 'react';
import {Route} from 'react-router-dom';
import HomePageComponent from '../homePage/HomePage.component';
import {LinksConstants} from '../../utilsAndSettings/LinkConstants';
import LastWeekComponent from '../lastWeek/LastWeek.component';
import AchievementListComponent from '../achievementsList/AchivementList.component';
import LastTrainingComponent from '../lastTraining/LastTraining.component';
import HistoryComponent from '../history/History.component';
import FriendsListComponent from '../friendsList/FriendsList.component';
import SettingsComponent from '../settings/Settings.component';
import InfoPageComponent from '../infoPage/InfoPage.component';
import {AuthContext} from '../../appContext/AuthContext';
import {LoginRegisterComponent} from '../loginRegister/LoginRegister.component';
import TrainingComponent from '../training/Training.component';

export function AppRoutesComponent(props) {

    const authContext = useContext(AuthContext);

    return (
        <div className="details">
            {authContext.isAuthenticated() ?
                <React.Fragment>
                    <Route exact={true} path="/" component={HomePageComponent}/>
                    <Route path={LinksConstants.TRAINING  + '/:trainingId'} component={TrainingComponent}/>
                    <Route path={LinksConstants.LAST_WEEK + '/'} component={LastWeekComponent}/>
                    <Route path={LinksConstants.ACHIEVEMENTS + '/'} component={AchievementListComponent}/>
                    <Route path={LinksConstants.LAST_TRAINING + '/'} component={LastTrainingComponent}/>
                    <Route path={LinksConstants.HISTORY + '/'} component={HistoryComponent}/>
                    <Route path={LinksConstants.FRIENDS + '/'} component={FriendsListComponent}/>
                    <Route path={LinksConstants.SETTINGS + '/'} component={SettingsComponent}/>
                    <Route path={LinksConstants.INFO + '/'} component={InfoPageComponent}/>
                </React.Fragment> :
                <React.Fragment>
                    <LoginRegisterComponent/>
                </React.Fragment>
            }
        </div>
    )
}
