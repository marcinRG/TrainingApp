import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthContext';
import PropTypes from 'prop-types';
import {firebaseDatabase} from '../data/firebase.database';
import {changeData} from '../utilsAndSettings/utils';
import {firebaseStorage} from '../data/firebase.storage';

export const UserDetailContext = React.createContext(null);

export function UserDetailsProvider(props) {
    const userAuth = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({
        name: '',
        motto: '',
        imageURL: '',
        selectedAchievements: ['a01', 'a13', 'a29']
    });

    const changeName = (name) => {
        changeData('name', name, userDetails, setUserDetails);
    }

    const changeMotto = (motto) => {
        changeData('motto', motto, userDetails, setUserDetails);
    }

    const saveUserData = () => {
        firebaseDatabase.updateUserDetails(userAuth.user.uid, userDetails).then(() => {
            console.log('data saved');
        });
    }

    const uploadImage = (file) => {
        if (userAuth.isAuthenticated()) {
            firebaseStorage.saveImage(file, userAuth.user.uid).then((imageUrl) => {
                firebaseDatabase.updateUserImage(userAuth.user.uid, imageUrl).then(() => {
                    changeData('imageURL', imageUrl, userDetails, setUserDetails);
                    console.log('saved image');
                });
            });
        }
    }

    useEffect(() => {
        if (userAuth.isAuthenticated()) {
            firebaseDatabase.getUserDetails(userAuth.user.uid).then((userDbDetails) => {
                if (userDbDetails) {
                    setUserDetails({...userDbDetails, selectedAchievements: ['a01', 'a13', 'a29']});
                }
            });
        } else {
            setUserDetails({
                name: '',
                motto: '',
                imageURL: '',
                selectedAchievements: []
            });
        }
    }, [userAuth.user.uid]);


    return (
        <UserDetailContext.Provider value={{userDetails, changeName, changeMotto, saveUserData, uploadImage}}>
            {props.children}
        </UserDetailContext.Provider>
    )
}

UserDetailsProvider.propTypes = {
    children: PropTypes.any,
};
