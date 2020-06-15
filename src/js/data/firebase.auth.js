import {FirebaseInst} from './firebase.config';


const auth = FirebaseInst.auth();

class FirebaseAuth {
    constructor() {
    }

    signOut()  {
        return auth.signOut();
    }

    signIn(email,password) {
        return auth.signInWithEmailAndPassword(email,password);
    }

    createUserAccount(email,password) {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    getUser() {
        return new Promise((resolve) => {
            auth.onAuthStateChanged((currentUser) => {
                resolve(currentUser);
            })
        });
    }
}

export const firebaseAuth = new FirebaseAuth();
