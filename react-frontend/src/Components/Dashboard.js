import React from "react";
import { Container} from "react-bootstrap";
import { Redirect } from "react-router";

import Cards from "./Cards";

const Dashboard = ({ user }) => {

    return(
        <Container>
            {user.Username === "" || !user.Username ? 
                <Redirect to="/login" /> 
                : 
                <div>
                    <h1>Hello {user.Username ? user.Username : "nobody"}</h1>
                    <Cards />
                </div>  
            }     
        </Container>
    );
}

export default Dashboard;