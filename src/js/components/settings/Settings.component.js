import React, {useContext} from 'react';
import './Settings.component.scss';
import {ImageUploaderComponent} from '../imageUploader/imageUploader.component';
import {AuthContext} from '../../appContext/AuthContext';
import {UserDetailContext} from '../../appContext/UserDetailsContext';

export default function SettingsComponent() {

    const userAuth = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);

    const changeName = (event) => {
        userDetailsContext.changeName(event.target.value);
    }

    const changeMotto = (event) => {
        userDetailsContext.changeMotto(event.target.value);
    }

    const saveUserData = (event) => {
        event.preventDefault();
        userDetailsContext.saveUserData();
    }

    return (
        <React.Fragment>
            {userAuth.isAuthenticated() && <div className="settings-container page-container">
                <h2 className="settings-title">Settings</h2>
                <div className="settings-wrapper">
                    <h3 className="settings-subtitle">User data</h3>
                    <form className="user-setting-form">
                        <label className="settings-form-label">e-mail</label>
                        <input type="text" className="settings-form-input" readOnly={true}
                               value={userAuth.user.email}></input>
                        <label className="settings-form-label">user name</label>
                        <input type="text" className="settings-form-input" value={userDetailsContext.userDetails.name}
                               onChange={changeName} maxLength={25}></input>
                        <label className="settings-form-label">user motto</label>
                        <textarea rows={5} className="settings-form-input area"
                                  value={userDetailsContext.userDetails.motto} onChange={changeMotto}></textarea>
                        <div className="settings-form-button-wrapper">
                            <button className="settings-form-button" onClick={saveUserData}>Save user data</button>
                        </div>
                    </form>
                    <h3 className="settings-subtitle">User image</h3>
                    <ImageUploaderComponent />
                </div>
            </div>}
        </React.Fragment>
    );
}
