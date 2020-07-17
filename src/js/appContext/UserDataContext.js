import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const UserDataContext = React.createContext(null);

export function UserDataProvider(props) {
    const [lastTraining,setLastTraining] = useState({});
    const [lastWeekTrainings, setLastWeekTrainings] = useState({});

    useEffect(()=>{
        console.log('Effect on UserDataProvider')
    },[]);


    return (
        <UserDataContext.Provider>
            {props.children}
        </UserDataContext.Provider>
    )

}

UserDataProvider.propTypes = {
    children: PropTypes.any,
};