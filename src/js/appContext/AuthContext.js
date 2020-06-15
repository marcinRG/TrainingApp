import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {firebaseAuth} from '../data/firebase.auth';

export const AuthContext = React.createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthentication] = useState(true);

    useEffect(() => {
        console.log('useEffect()');
        firebaseAuth.getUser().then((user) => {
           setUser(user);
        });
    });


    const logOut = () => {
        console.log('log out');
        setUser(null);
        setAuthentication(false);
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, logOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any,
};
