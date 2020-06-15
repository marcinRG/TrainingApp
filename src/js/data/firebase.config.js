import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: 'AIzaSyC-Md1p6DdnreShRtFuLkTa3oxlxJ6tvjc',
    authDomain: 'trainingappdb.firebaseapp.com',
    databaseURL: 'https://trainingappdb.firebaseio.com',
    projectId: 'trainingappdb',
    storageBucket: 'trainingappdb.appspot.com',
    messagingSenderId: '938801712512',
    appId: '1:938801712512:web:c895375f0019383b250565'
};

export const FirebaseInst = firebase.initializeApp(firebaseConfig);

