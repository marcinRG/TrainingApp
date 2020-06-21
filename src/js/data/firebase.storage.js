import {FirebaseInst} from './firebase.config';

const storage = FirebaseInst.storage();

class FirebaseStorage {

    constructor() {
        this.imagesNode = 'images';
        this.imagesRef = storage.ref().child(this.imagesNode);
    }

    saveImage(file, userUID, onchange) {
        console.log('saving image');
        return saveImage(file, this.imagesRef, userUID, onchange);
    }
}

export const firebaseStorage = new FirebaseStorage();

function saveImage(file, ref, userUID, onchange) {
    const fileRef = ref.child(userUID + '/' + file.name);
    const task = fileRef.put(file);
    task.on('state_changed', onchange);
    return task.then(() => {
        return getFileUrl(userUID,file.name, ref);
    });
}

function getFileUrl(userUID,filename, ref) {
    return ref.child(userUID + '/' + filename).getDownloadURL();
}
