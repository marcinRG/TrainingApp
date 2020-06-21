import {FirebaseInst} from './firebase.config';

const database = FirebaseInst.database();
const userDetails = 'userDetails';

class FirebaseDatabase {

    constructor() {
        this.usersDetailsRef = database.ref().child(userDetails);
    }

    getUserDetails(userUID) {
        const userRef = this.usersDetailsRef.child(userUID);
        return getElement(userRef);
    }

    // removeUserDetails(userUID) {
    //     return removeElem(userUID, this.usersDetailsRef);
    // }

    updateUserDetails(userUID, obj) {
        return updateElem(userUID, obj, this.usersDetailsRef);
    }

    updateUserImage(userUID, imagePath) {
        return updateElem(userUID,{imageURL: imagePath},this.usersDetailsRef);
    }


}

export const firebaseDatabase = new FirebaseDatabase();

// function removeElem(userUID, obj, ref) {
//     return ref.child(userUID).remove();
// }

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
