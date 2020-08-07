import './HomePage.component.scss';
import React from 'react';
import {LastAchievementsComponent} from '../lastAchievements/LastAchievements.component';
import {TxtFileUploaderComponent} from '../textUploader/txtFileUploader.component';
import {TrainingSummaryComponent} from '../trainingSummary/trainingSummary.component';

export default function HomePageComponent(props) {

    return (
        <div className="home-container page-container">
            <div className="home-wrapper">
                <h2 className="homepage-title">Home page</h2>
                <TxtFileUploaderComponent />
                <LastAchievementsComponent />
                <div className="summaries-wrapper">
                    <h3 className="summaries-subtitle">Training summaries</h3>
                    <TrainingSummaryComponent calories={'600'} distance={'9,84'} heartbeatRate={'180'} title={'Last training summary'} />
                    <TrainingSummaryComponent calories={'3600'} distance={'51,25'} heartbeatRate={'180'} title={'Last 7 days summary'} />
                </div>
            </div>
        </div>
    )
}
