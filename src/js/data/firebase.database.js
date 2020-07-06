import {FirebaseInst} from './firebase.config';

const database = FirebaseInst.database();
const userDetails = 'userDetails';
const userAchievements = 'achievements';

class FirebaseDatabase {

    constructor() {
        this.usersDetailsRef = database.ref().child(userDetails);
        this.userAchievements = database.ref().child(userAchievements);
    }

    getUserDetails(userUID) {
        const userRef = this.usersDetailsRef.child(userUID);
        return getElement(userRef);
    }

    // removeUserDetails(userUID) {
    //     return removeElem(userUID, this.usersDetailsRef);
    // }

    saveSelectedAchievements(userUID, achievements) {
        console.log(achievements)
    }

    addAchievement(userUID, achievement) {
        return addElement(userUID, achievement, this.userAchievements);
    }

    getUserAchievements(userUID) {
        const achievementsRef = this.userAchievements.child(userUID);
        return getElement(achievementsRef);
    }


    updateUserDetails(userUID, obj) {
        return updateElem(userUID, obj, this.usersDetailsRef);
    }

    updateUserImage(userUID, imagePath) {
        return updateElem(userUID, {imageURL: imagePath}, this.usersDetailsRef);
    }


}

export const firebaseDatabase = new FirebaseDatabase();

// function removeElem(userUID, obj, ref) {
//     return ref.child(userUID).remove();
// }

function addElement(userUID, obj, ref) {
    return ref.child(userUID).push().set(obj);
}

function updateElem(userUID, obj, ref) {
    return ref.child(userUID).update(obj);
}

function getElement(ref) {
    const promise = new Promise((resolve, reject) => {
        ref.on('value', (snapshot) => {
            resolve(snapshot.val());
        }, (errorObject) => {
            reject(errorObject);
        });
    });
    return promise;
}
