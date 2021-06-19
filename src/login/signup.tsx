// UI from https://github.com/animationbro/glass-morphism-login-form-css
import React, {useState} from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from '@material-ui/core/Container';
import "./signup.scss";
import {appAlert} from "lib/stdlib";
import {define} from "lib/stdlib";
import {auth} from "auth";



export default function LoginPage(props : RouteComponentProps) {
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    function onEmailChange(event : React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onUserNameChange(event : React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

    function onPasswordChange(event : React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    

    
    async function onSignupButtonClick() {
        if( email.length <= 0 ) {
            appAlert.error("이메일이나 유저이름을 입력해 주십시오."); 
            return ;
        }

        if ( password.length <= 0 ) {
            appAlert.error("패스워드를 입력해 주십시오.");
            return ;
        }
        
        try {
            await auth.signup(email, userName, password);            
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
                    <p>Sign up</p>
                    <input type="email" placeholder="Email" value={email} onChange={onEmailChange}/><br/>
                    <input type="text" placeholder="UserName" value={userName} onChange={onUserNameChange}/><br/>
                    <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} /><br/>
                    <input type="button" value="Signup" onClick={onSignupButtonClick}/><br/>
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
