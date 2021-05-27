// Code from https://github.com/animationbro/glass-morphism-login-form-css
import Container from '@material-ui/core/Container';
import "./login.scss";


export default function LoginPage(props : any) {
    return (
        <div className="login-dir login-file">
            <Container className="login-container">
                <form >
                    <p>Welcome</p>
                    <input type="email" placeholder="Email"/><br/>
                    <input type="password" placeholder="Password"/><br/>
                    <input type="button" value="Sign in"/><br/>
                    <a href="#">Forgot Password?</a>
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