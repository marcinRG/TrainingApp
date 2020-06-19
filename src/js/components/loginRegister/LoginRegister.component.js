import React, {useState, useContext} from 'react';
import './LoginRegister.component.scss';
import {AuthContext} from '../../appContext/AuthContext';


export function LoginRegisterComponent() {
    const authContext = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        repeatedPassword: ''
    })

    const changeShowLogin = (val) => {
        setShowLogin(val);
    };

    const changeLoginData = (fieldName, fieldValue) => {
        const data = {...loginData, [fieldName]: fieldValue};
        setLoginData(data);
    }

    const changeEmail = (event) => {
        changeLoginData('email', event.target.value);
    }

    const changePassword = (event) => {
        changeLoginData('password', event.target.value);
    }

    const changeRepeatedPassword = (event) => {
        changeLoginData('repeatedPassword', event.target.value);
    }

    const loginOrRegister = (event) => {
        event.preventDefault();
        if (showLogin) {
            authContext.logIn(loginData.email, loginData.password);
        }
        if (!showLogin && (loginData.password === loginData.repeatedPassword)) {
            console.log('registration not enabled');
        }
    }


    return (
        <React.Fragment>
            <div className="login-register-container page-container">
                <h2 className="login-register-title">Login or register</h2>
                <div className="login-register-wrapper">
                    <div className="selection-buttons-container">
                        <button className={getButtonClass(showLogin)} onClick={() => changeShowLogin(true)}>Login
                        </button>
                        <button className={getButtonClass(!showLogin)} onClick={() => changeShowLogin(false)}>Register
                        </button>
                    </div>
                    <p className="info">{showLogin ? <span>Login to your account</span> :
                        <span>Register new account</span>}</p>
                    <form className="login-register-form">
                        <label>Email</label>
                        <div className="input-wrapper email">
                            <input className="input-text" type="text" placeholder="e-mail" onChange={changeEmail}
                                   value={loginData.email}/>
                        </div>

                        <label>Password</label>
                        <div className="input-wrapper password">
                            <input className="input-text" type="password" placeholder="password"
                                   onChange={changePassword}
                                   value={loginData.password}/>
                        </div>

                        {!showLogin && <React.Fragment>
                            <label>Repeat password</label>
                            <div className="input-wrapper password">
                                <input className="input-text" type="password" placeholder=" repeat password"
                                       onChange={changeRepeatedPassword} value={loginData.repeatedPassword}/>
                            </div>
                        </React.Fragment>}

                        <button className="login-register-button" onClick={loginOrRegister}>{showLogin ?
                            <span>Log in</span> :
                            <span>Register</span>}</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

function getButtonClass(active) {
    const className = 'selection-button';
    if (active) {
        return className + ' active';
    }
    return className;
}
