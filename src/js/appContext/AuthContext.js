import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {firebaseAuth} from '../data/firebase.auth';

export const AuthContext = React.createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState({uid: '', email: ''});

    const isAuthenticated = () => {
        return (user.uid !== '' && user.email !== '');
    }

    useEffect(() => {
        firebaseAuth.getUser().then((dbUser) => {
            if (dbUser) {
                setUser({
                    uid: dbUser.uid,
                    email: dbUser.email
                });
            }
        });
    }, [user.uid]);

    const logIn = (email, password) => {
        firebaseAuth.signIn(email, password).then(
            (userCredential) => {
                setUser({
                    uid: userCredential.user.uid,
                    email: userCredential.user.email
                });
            }
        );
    }

    const registerUser = (email, password) => {
        firebaseAuth.createUserAccount(email, password).then(() => {
            console.log('user created');
        });
    }

    const logOut = () => {
        firebaseAuth.signOut().then(() => {
            setUser({uid: '', email: ''});
        });
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, logOut, logIn, registerUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any,
};
