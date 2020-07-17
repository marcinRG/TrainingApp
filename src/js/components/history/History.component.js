import React from 'react';
import './History.component.scss';
import {DatePickerComponent} from '../datePicker/DatePicker.component';

export default function HistoryComponent(props) {
    return (
        <div className="history-container page-container">
            <h2 className="history-title">History</h2>
            <DatePickerComponent/>
        </div>
    );
}
