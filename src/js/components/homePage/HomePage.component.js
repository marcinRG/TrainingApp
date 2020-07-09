import './HomePage.component.scss';
import React, {useState, useContext} from 'react';
import {AuthContext} from '../../appContext/AuthContext';
import {firebaseDatabase} from '../../data/firebase.database';
import {getDateString} from '../../utilsAndSettings/utils';

export default function HomePageComponent(props) {
    const userAuth = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        date: '',
        achievementID: ''
    });

    const [searchQuery, setSearchQuery] = useState('');

    const changeDate = (event) => {
        const newState = {...formValues, date: event.target.value};
        setFormValues(newState);
    }

    const changeAchievement = (event) => {
        const newState = {...formValues, achievementID: event.target.value};
        setFormValues(newState);
    }

    const changeQuery = (event) => {
        setSearchQuery(event.target.value);
    }

    const saveAchievement = (event) => {
        event.preventDefault();
        const userUID = userAuth.user.uid;

        firebaseDatabase.addAchievement(userUID, {
            date: getDateString(formValues.date,'-'),
            achievementID: formValues.achievementID
        }).then(() => {
            console.log('save ok');
        }).catch(() => {
            console.log('save error');
        })
    }

    const getAchievements = () => {
        const userUID = userAuth.user.uid;
        console.log(userUID);
        firebaseDatabase.getUserAchievements(userUID).then((achievements) => {
            console.log('promise ok');
            console.log(achievements);
        }).catch(() => {
            console.log('promise error');
        })
    }

    const getUsers = (event) => {
        event.preventDefault();
        firebaseDatabase.getUsers(searchQuery).then((value) => {
            console.log(value);
        });
    }

    return (
        <div className="home-container page-container">
            <h2>Home page</h2>
            <form className="temp-form">
                <label>Data</label>
                <input type="text" value={formValues.date} onChange={changeDate}/>
                <label>Achievement id</label>
                <input type="text" value={formValues.achievementID} onChange={changeAchievement}/>
                <button onClick={saveAchievement}>Save achievement</button>
            </form>
            <button onClick={getAchievements}>get Achievements</button>
            <form className="temp-form">
                <label>search phase</label>
                <input type="text" value={searchQuery} onChange={changeQuery}/>
                <button onClick={getUsers}>Search</button>
            </form>
        </div>
    )
}
