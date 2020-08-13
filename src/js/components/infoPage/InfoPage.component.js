import './InfoPage.component.scss';
import React from 'react';

export default function InfoPageComponent() {
    return (
        <div className="info-container page-container">
            <h2>Info</h2>
            <h3>About</h3>
            <p>Simple react page. Mockup of training and workout tracker. </p>

            <h3>Tech stack</h3>
            <ul>
                <li>react + hooks + context api</li>
                <li>d3.js</li>
                <li>firebase</li>
            </ul>
            <h3>Other resources</h3>
            <ul>
                <li>template: </li>
            </ul>
        </div>
    );
}
