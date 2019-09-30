import React from 'react';
import style from './Achievement.component.scss';

export default function AchievementComponent(props) {
    return (
        <div className="achievement">
            <div className="icon-wrapper"></div>
            <div className="description-wrapper">
                <h3 className="achievement-name">Lorem ipsum</h3>
                <p className="achievement-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Asperiores autem cumque doloremque dolorum eaque inventore </p>
                <p className="achievement-date">2015-05-17</p>
            </div>
        </div>
    );
}
