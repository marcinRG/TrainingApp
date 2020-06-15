import {FirebaseInst} from './firebase.config';

const database = FirebaseInst.database();

class FirebaseDatabase {
    constructor() {
    }
}

export const firebaseDatabase = new FirebaseDatabase();
