import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';

const LoginForm = ({Login}) => {
    
    const [details] = useState({
        username: "",
        password: ""
    });
    
    const submitHandler = e => {
        e.preventDefault();
        
        details.username= e.target.username.value;
        details.password= e.target.password.value;
       
        Login(details);
    }

    return(
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Control className="form-input" type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Control className="form-input" type="password" placeholder="Password" />
            </Form.Group>

            <Button className="login-button" variant="light" type="submit">
                Log In
            </Button>
        </Form>
    )
}
export default LoginForm;