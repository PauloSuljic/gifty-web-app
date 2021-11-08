//import { useState } from "react";
import { Container } from 'react-bootstrap';
import { Redirect } from "react-router";
import SignupForm from "./SignupForm";


const Signup = ({user}) => {
        
    if (user.Username && user.Username !== "") {
        return <Redirect push to={{ pathname: '/dashboard' }}/>
    }

    const registerUser = e => {
        e.preventDefault();

        const date = new Date(e.target.dob.value);
        
        //const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
        //console.log(date.toLocaleDateString('hr', options));
        
        fetch('http://localhost:5000/api/users',{
            method:"POST",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                FirstName: e.target.firstName.value,
                LastName: e.target.lastName.value,
                Username: e.target.username.value,
                DateOfBirth: date,
                Email: e.target.emailAddress.value,
                Password: e.target.password.value,
                PhotoFileName: 'anonymous.png'
            })
        }) 
        .then(response => {
            return response.json()
        })
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })

    }

    return(
        <Container>
            <div className="signup-page">
                <h2>SIGN UP</h2><br/>
                <SignupForm handleSignup={registerUser}/>
            </div>
        </Container>
    );
}

export default Signup;