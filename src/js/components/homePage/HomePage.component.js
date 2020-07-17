import './HomePage.component.scss';
import React from 'react';
import {LastAchievementsComponent} from '../lastAchievements/LastAchievements.component';
import {TxtFileUploaderComponent} from '../textUploader/txtFileUploader.component';
import {LastTrainingSummaryComponent} from '../lastTrainingSummary/LastTrainingSummary.component';
import {LastWeekSummaryComponent} from '../lastWeekSummary/LastWeekSummary.component';

export default function HomePageComponent(props) {

    return (
        <div className="home-container page-container">
            <h2 className="homepage-title">Home page</h2>
            <TxtFileUploaderComponent />
            <LastAchievementsComponent />
            <LastTrainingSummaryComponent />
            <LastWeekSummaryComponent/>
        </div>
    )
}
