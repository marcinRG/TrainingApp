import {FirebaseInst} from './firebase.config';

const database = FirebaseInst.database();
const userDetails = 'userDetails';
const userAchievements = 'achievements';
const userFriends = 'friends';
const trainings = 'trainings';

class FirebaseDatabase {

    constructor() {
        this.usersDetailsRef = database.ref().child(userDetails);
        this.userAchievements = database.ref().child(userAchievements);
        this.userFriends = database.ref().child(userFriends);
        this.userTrainings = database.ref().child(trainings);
    }

    getUserDetails(userUID) {
        const userRef = this.usersDetailsRef.child(userUID);
        return getElement(userRef);
    }

    getFriendsList(userUID) {
        const userRef = this.userFriends.child(userUID);
        return getElement(userRef);
    }

    saveFriendsList(userUID, friendsList) {
        const userRef = this.userFriends.child(userUID);
        return userRef.set(friendsList);
    }

    addTraining(userUID, trainingData) {
        return addElement(userUID, trainingData, this.userTrainings);
    }

    getNLastsTraining(userUID, count) {
        const userTrainings = this.userTrainings.child(userUID);
        const query = userTrainings.orderByKey().limitToLast(count);
        return executeQuery(query);
    }

    saveSelectedAchievements(userUID, achievements, selectedAchievements) {
        const achievementsRef = this.userAchievements;
        const userRef = this.usersDetailsRef.child(userUID).child('selectedAchievements');
        return updateElem(userUID, achievements, achievementsRef).then(() => {
            return userRef.set(selectedAchievements);
        });
    }

    getUsers(textQuery) {
        const userRef = this.usersDetailsRef;
        const query = userRef.orderByChild('name').startAt(textQuery).limitToFirst(3);
        return executeQuery(query);
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

    // removeUserDetails(userUID) {
    //     return removeElem(userUID, this.usersDetailsRef);
    // }
    // addAchievement(userUID, achievement) {
    //     return addElement(userUID, achievement, this.userAchievements);
    // }

}

export const firebaseDatabase = new FirebaseDatabase();

function executeQuery(query) {
    const promise = new Promise((resolve, reject) => {
        query.on('value', (snapshot) => {
            resolve(snapshot.val());
        }, (errorObject) => {
            reject(errorObject);
        });
    });
    return promise;
}


function removeElem(userUID, obj, ref) {
    return ref.child(userUID).remove();
}

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
