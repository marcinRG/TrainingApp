import './DatePicker.component.scss';
import {months} from './../../data/monthAndDaysTables';
import React, {useState, useEffect, useContext} from 'react';
import {DayHeaderRowComponent} from './DayHeaderRow.component';
import {DatePickerCellComponent} from './DatePickerCell.component';
import {UserDataContext} from '../../appContext/UserDataContext';
import {getDateString} from '../../utilsAndSettings/utils';
import {LinksConstants} from '../../utilsAndSettings/LinkConstants';

export function DatePickerComponent() {

    const userDataContext = useContext(UserDataContext);
    const [calendar, setCalendar] = useState({
        date: new Date(),
    });

    const [daysOfMonth, setDaysOfMonth] = useState([]);

    useEffect(() => {
        getTrainingsAndDays(calendar.date);
    }, [calendar.date]);

    const getTrainingsAndDays = (date) => {
        const firstAndLastDay = getFirstAndLastDayOfMonth(date);
        userDataContext.getUserTrainingsFromDataBaseInTimeSpan(firstAndLastDay.first,firstAndLastDay.last).then((trainings)=>{
            setDaysOfMonth([...createDaysOfMonth(calendar.date, transformTrainingsObject(trainings))]);
        });
    }

    const changeMonth = (event) => {
        let month = calendar.date.getMonth();
        const operation = event.target.getAttribute('data-operation');
        if (operation === 'down') {
            month = month - 1;
        } else {
            month = month + 1;
        }
        const year = calendar.date.getFullYear();
        const tempDate = new Date(year, month, 1);
        setCalendar({
            date: tempDate,
        });
    };

    return (
        <div className="datepicker-input">
            <div className={'left-panel'}>
                <span className={'icon icon-direction-left'} onClick={changeMonth} data-operation={'down'}></span>
            </div>
            <div className={'center-panel'}>
                <div className="date-picker">
                    <div className="month-display">{calendar.date.getFullYear() + ' ' + getMonthNames(calendar.date.getMonth())}</div>
                    <table className="days-table">
                        <thead>
                        <DayHeaderRowComponent cellClassName={'cell-header'} isDaysShort={true}/>
                        </thead>
                        <tbody>
                        {createTableRows(6, 7, daysOfMonth)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={'right-panel'}>
                <span className={'icon icon-direction-right'} onClick={changeMonth} data-operation={'up'}></span>
            </div>
        </div>
    );
}

function getMonthNames(monthIndex) {
    return months[monthIndex];
}


function createDaysOfMonth(date, trainingDays) {
    const firstDay = firstDayWeekOfMonth(date);
    const daysInPrevious = lastDayOfPreviousMonth(date);
    const daysCount = daysInMonth(date);
    const maxValue = 6 * 7;
    let values = [];
    for (let i = 0; i < maxValue; i++) {
        if (i < firstDay) {
            values.push({
                day: daysInPrevious - firstDay + i + 1,
                enabled: false
            });
        }
        if (i >= firstDay && i < (daysCount + firstDay)) {

            values.push({
                day: i - firstDay + 1,
                enabled: true,
                link: getLink(trainingDays, i - firstDay + 1)
            });
        }
        if (i >= (daysCount + firstDay)) {
            values.push({
                day: i - (daysCount + firstDay) + 1,
                enabled: false
            });
        }
    }
    return values;
}

function lastDayOfPreviousMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

function getFirstAndLastDayOfMonth(date) {
    return {
        first: getDateString(firstDayOfMonth(date).toString(), '-'),
        last: getDateString(lastDayOfMonth(date).toString(), '-'),
    }
}

function firstDayWeekOfMonth(date) {
    return firstDayOfMonth(date).getDay();
}

function firstDayOfMonth(date) {
    const dateTemp = new Date(date.getTime());
    dateTemp.setDate(1);
    return dateTemp;
}

function lastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function daysInMonth(date) {
    return lastDayOfMonth(date).getDate();
}

function createTableRows(maxHeight, maxWidth, daysTable) {
    let rows = [];
    if (daysTable.length > 0) {
        for (let i = 0; i < maxHeight; i++) {
            rows.push(<tr key={i}>{createTableCells(i, maxWidth, daysTable)}</tr>)
        }
    }
    return rows;
}

function createTableCells(row, maxWidth, daysTable) {
    let cells = [];
    for (let i = 0; i < maxWidth; i++) {
        const id = row * maxWidth + i;
        const val = daysTable[id];
        cells.push(<DatePickerCellComponent key={id} value={val.day} cellClass={'cell-day'} isEnabled={val.enabled}
                                            link={val.link}/>);
    }
    return cells;
}

function getLink(trainingDays, index) {
    if (trainingDays && trainingDays[index + '']) {
        return LinksConstants.TRAINING + '/' + trainingDays[index + ''].id;
    }
}

function transformTrainingsObject(trainingsObject) {
    const output = {};
    if (trainingsObject && Object.keys(trainingsObject)) {
        const keys = Object.keys(trainingsObject);
        keys.forEach((key) => {
            let obj = {};
            obj.id = key;
            output[getDayFromDate(trainingsObject[key].date)] = obj;
        });
    }
    return output;
}

function getDayFromDate(dateAsString) {
    const date = new Date(dateAsString);
    return date.getDate();
}
