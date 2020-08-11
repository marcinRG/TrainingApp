import './HomePage.component.scss';
import React, {useContext} from 'react';
import {LastAchievementsComponent} from '../lastAchievements/LastAchievements.component';
import {TxtFileUploaderComponent} from '../textUploader/txtFileUploader.component';
import {TrainingSummaryComponent} from '../trainingSummary/trainingSummary.component';
import {UserDataContext} from '../../appContext/UserDataContext';
import {LinksConstants} from '../../utilsAndSettings/LinkConstants';

export default function HomePageComponent() {

    const userDataContext = useContext(UserDataContext);

    return (
        <div className="home-container page-container">
            <div className="home-wrapper">
                <h2 className="homepage-title">Home page</h2>
                <TxtFileUploaderComponent/>
                <LastAchievementsComponent/>
                <div className="summaries-wrapper">
                    <h3 className="summaries-subtitle">Training summaries</h3>
                    <TrainingSummaryComponent data={userDataContext.getLastTrainingSummary()}
                                              title={'Last training summary'} link={ LinksConstants.LAST_TRAINING}/>
                    <TrainingSummaryComponent data={userDataContext.getLastWeekTrainingSummary()}
                                              title={'Last 7 days summary'} link={LinksConstants.LAST_WEEK}/>
                </div>
            </div>
        </div>
    )
}
