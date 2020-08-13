import React, {useRef, useState, useContext} from 'react';
import './TxtFileUploader.component.scss';
import {UserDataContext} from '../../appContext/UserDataContext';

export function TxtFileUploaderComponent() {

    const userDataContext = useContext(UserDataContext);
    const inputTextRef = useRef();
    const inputFileRef = useRef();
    const [file, setFile] = useState(null);

    const loadFile = (event) => {
        event.preventDefault();
        inputFileRef.current.click();
    }

    const saveFileData = (event) => {
        event.preventDefault();
        if (file) {
            userDataContext.saveUserTrainingToDatabase(file);
            inputTextRef.current.value = '';
            setFile(null);
        }
    }

    const fileChange = () => {
        const fileInput = inputFileRef.current.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            inputTextRef.current.value = fileInput.name;
            setFile(JSON.parse(fileReader.result));
        });
        fileReader.readAsText(fileInput)
    }


    return (
        <div className="text-uploader-component">
            <h3 className="file-uploader-subtitle">training data uploader</h3>
            <form className="file-uploader-form">
                <input type="text" className="file-name-input" readOnly={true} ref={inputTextRef}/>
                <input className="upload-input" type="file"
                       accept="text/plain,.txt,.text,.json"
                       style={{display: 'none'}} ref={inputFileRef} onChange={fileChange}/>
                <div className="btn-wrapper">
                    <button className="btn-uploader" onClick={loadFile}>load data from file</button>
                    <button className="btn-uploader" onClick={saveFileData}>save to database</button>
                </div>
            </form>
        </div>
    )
}
