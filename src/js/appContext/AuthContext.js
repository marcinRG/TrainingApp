import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {firebaseAuth} from '../data/firebase.auth';

export const AuthContext = React.createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthentication] = useState(true);

    useEffect(() => {
        firebaseAuth.getUser().then((user) => {
            if (user) {
                setAuthentication(true);
            }
        });
    });

    const logIn = (email,password) => {
        firebaseAuth.signIn(email, password).then(
            (userCredential) => {
                setUser({
                   uid: userCredential.user.uid,
                   email: userCredential.user.email
                });
            }
        );
    }

    const logOut = () => {
        firebaseAuth.signOut().then(()=>{
            setUser(null);
            setAuthentication(false);
        });
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, logOut, logIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any,
};
