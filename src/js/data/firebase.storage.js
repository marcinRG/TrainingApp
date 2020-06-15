import {FirebaseInst} from './firebase.config';

const storage = FirebaseInst.storage();

class FirebaseStorage {

    constructor() {
        this.imagesNode = 'images';
        this.imagesRef = storage.ref().child(this.imagesNode);
    }

    saveImage(file, onchange) {
        console.log('saving category image');
        return saveImage(file, this.imagesRef, onchange);
    }
}

export const firebaseStorage = new FirebaseStorage();

function saveImage(file, ref, onchange) {
    const fileRef = ref.child(file.name);
    const task = fileRef.put(file);
    task.on('state_changed', onchange);
    return task.then(() => {
        return this.getFileUrl(file.name, ref);
    });
}

function getFileUrl(filename, ref) {
    return ref.child(filename).getDownloadURL();
}
