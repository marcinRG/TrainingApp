import './DatePicker.component.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export function DatePickerComponent(props) {
    return (
        <div className="datepicker-input">
            <div className={'left-panel'}>
                <span className={'icon icon-direction-left'}></span>
            </div>
            <div className={'center-panel'}>
                <div className="date-picker">
                    <div className="month-display">kwiecień 2020</div>
                    <table className="days-table">
                        <thead>
                        <tr>
                            <td className="cell-header">Nie</td>
                            <td className="cell-header">Pon</td>
                            <td className="cell-header">Wto</td>
                            <td className="cell-header">Sro</td>
                            <td className="cell-header">Czw</td>
                            <td className="cell-header">Pio</td>
                            <td className="cell-header">Sob</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="cell-day disabled" disabled="">29</td>
                            <td className="cell-day disabled" disabled="">30</td>
                            <td className="cell-day disabled" disabled="">31</td>
                            <td className="cell-day">1</td>
                            <td className="cell-day">2</td>
                            <td className="cell-day">3</td>
                            <td className="cell-day">4</td>
                        </tr>
                        <tr>
                            <td className="cell-day">5</td>
                            <td className="cell-day">6</td>
                            <td className="cell-day">7</td>
                            <td className="cell-day today-date current-date">8</td>
                            <td className="cell-day">9</td>
                            <td className="cell-day">10</td>
                            <td className="cell-day">11</td>
                        </tr>
                        <tr>
                            <td className="cell-day">12</td>
                            <td className="cell-day">13</td>
                            <td className="cell-day">14</td>
                            <td className="cell-day">15</td>
                            <td className="cell-day">16</td>
                            <td className="cell-day">17</td>
                            <td className="cell-day">18</td>
                        </tr>
                        <tr>
                            <td className="cell-day">19</td>
                            <td className="cell-day">20</td>
                            <td className="cell-day">21</td>
                            <td className="cell-day">22</td>
                            <td className="cell-day">23</td>
                            <td className="cell-day">24</td>
                            <td className="cell-day">25</td>
                        </tr>
                        <tr>
                            <td className="cell-day">26</td>
                            <td className="cell-day">27</td>
                            <td className="cell-day">28</td>
                            <td className="cell-day">29</td>
                            <td className="cell-day">30</td>
                            <td className="cell-day disabled" disabled="">1</td>
                            <td className="cell-day disabled" disabled="">2</td>
                        </tr>
                        <tr>
                            <td className="cell-day disabled" disabled="">3</td>
                            <td className="cell-day disabled" disabled="">4</td>
                            <td className="cell-day disabled" disabled="">5</td>
                            <td className="cell-day disabled" disabled="">6</td>
                            <td className="cell-day disabled" disabled="">7</td>
                            <td className="cell-day disabled" disabled="">8</td>
                            <td className="cell-day disabled" disabled="">9</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/*<div className="date-picker">*/}


                {/*</div>*/}
            </div>
            <div className={'right-panel'}>
                <span className={'icon icon-direction-right'}></span>
            </div>
        </div>
    )
}

DatePickerComponent.propTypes = {
    label: PropTypes.string.isRequired,
};