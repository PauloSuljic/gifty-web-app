import { Container } from 'react-bootstrap';
import { Redirect } from "react-router";
import LoginForm from "./LoginForm";

const Login = ({user, setUser}) => {

    // If user is logged in redirect to dashboard
    if (user.Username && user.Username !== ""){
        return <Redirect push to="dashboard" />
    }

    // Handle Login
    const handleSubmit = async details => {
        // Get all users
        const userData = await fetch('http://localhost:5000/api/users');
        const users = await userData.json(); 

        // Find current user
        const user = users.find(user => user.Username === details.username 
        && user.Password === details.password);
        
        if (user){
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        }else{
            alert("Wrong username or password");
        } 
    }


    return(
        <Container>
            <div className="login-page">     
                <div>
                    <h2>LOG IN</h2><br/>
                    <LoginForm Login={handleSubmit} />
                </div>               
            </div>
        </Container>
    );
}

export default Login;