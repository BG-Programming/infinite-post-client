// Code from https://github.com/animationbro/glass-morphism-login-form-css
import React, {useState} from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from '@material-ui/core/Container';
import "./login.scss";
import {appAlert} from "lib/stdlib";
import {api} from "api";
import {dataStorage, SpecialPackageName} from "util/DataStorage";
import {define} from "lib/stdlib";
import {auth} from "auth";



export default function LoginPage(props : RouteComponentProps) {
    const [emailOrUserName, setEmailOrUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    function onEmailChange(event : React.ChangeEvent<HTMLInputElement>) {
        setEmailOrUserName(event.target.value);
    }

    function onPasswordChange(event : React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    
    async function onLoginButtonClick() {
        if( emailOrUserName.length <= 0 ) {
            appAlert.error("이메일이나 유저이름을 입력해 주십시오."); 
            return ;
        }

        if ( password.length <= 0 ) {
            appAlert.error("패스워드를 입력해 주십시오.");
            return ;
        }
        
        try {
            await auth.login(emailOrUserName, password);            
            props.history.push(define.Route.HOME);
        }catch(e) {            
            console.info("e>>>", e);
            // appAlert.error(e.getMessage());
        }
    }

    return (
        <div className="login-dir login-file">
            <Container className="login-container">
                <form >
                    <p>Welcome</p>
                    <input type="email" placeholder="Email or UserName" value={emailOrUserName} onChange={onEmailChange}/><br/>
                    <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} /><br/>
                    <input type="button" value="Login" onClick={onLoginButtonClick}/><br/>
                    <a href="/">Forgot Password?</a>
                </form>
                
                <div className="drops">
                    <div className="drop drop-1"></div>
                    <div className="drop drop-2"></div>
                    <div className="drop drop-3"></div>
                    <div className="drop drop-4"></div>
                    <div className="drop drop-5"></div>
                </div>

            </Container>                        
        </div>    
    )
}
