import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";

const Navigation = ({user, handleLogout, updateFriends}) => {

    const [notifications, setNotifications] = useState([]);
    const [counter, setCounter] = useState(0);

    const fetchNotifications = async() => {
        const fdata = await fetch('http://localhost:5000/api/friendships');
        const friendships = await fdata.json();

        const udata = await fetch('http://localhost:5000/api/users');
        const users = await udata.json();

        const usernames = []
        
        const filteredFriendships = friendships.filter(friendship => friendship.RequestReceiver === user.UserId 
            && friendship.StatusReceiver === false);
        
        filteredFriendships.map((friendship) => (
            usernames.push(users.find(user => user.UserId === friendship.RequestSender))
        ));

        setCounter(usernames.length);
        
        setNotifications(usernames);
        
    }

    useEffect(() => {

       let isMounted = true;

        const fetchNotifications = async() => {
            const fdata = await fetch('http://localhost:5000/api/friendships');
            const friendships = await fdata.json();

            const udata = await fetch('http://localhost:5000/api/users');
            const users = await udata.json();

            const usernames = []
            
            // Pending Friendships 
            const filteredFriendships = friendships.filter(friendship => friendship.RequestReceiver === user.UserId 
                && friendship.StatusReceiver === false);
            
            filteredFriendships.forEach((friendship) => {
                usernames.push(users.find(user => user.UserId === friendship.RequestSender));
            });

            setCounter(usernames.length);
            
            setNotifications(usernames);  
 
        }

        if (isMounted){
            fetchNotifications()
        }

        return () => {
            isMounted = false;
        } 

    },[user.UserId]);

    const removeRequest = async (userId) => {
        const fdata = await fetch('http://localhost:5000/api/friendships');
        const friendships = await fdata.json();

        const result = friendships.find(friendship => userId === friendship.RequestSender && user.UserId === friendship.RequestReceiver)
        
        if(result){
            fetch(`http://localhost:5000/api/friendships/${result.FriendshipId}`,{
                method:"DELETE",
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                },
                body: null
                })
            .then(response => {
                return response.json()
            })
            .then(fetchNotifications)
        }
    }

    const acceptRequest = async (userId) => {
        const fdata = await fetch('http://localhost:5000/api/friendships');
        const friendships = await fdata.json();

        const result = friendships.find(friendship => userId === friendship.RequestSender && user.UserId === friendship.RequestReceiver)

        fetch('http://localhost:5000/api/friendships',{
            method:"PUT",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                FriendshipId: result.FriendshipId,
                RequestSender: result.RequestSender,
                RequestReceiver: result.RequestReceiver,
                StatusSender: true,
                StatusReceiver: true
            })
        })
        .then(response => {
            return response.json()
        })
        .then(fetchNotifications)
        .then(updateFriends)
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
            <Container>  
                {!user.Username || user.Username === "" ? 
                <Navbar.Brand href="/">Gifty</Navbar.Brand> : 
                <Navbar.Brand href="/dashboard">Gifty</Navbar.Brand> }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {!user.Username || user.Username === "" ?
                        // If logged out display this navbar
                        <>
                        <Nav className="me-auto">
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Log In</Nav.Link>
                        </Nav>
                        </>
                        : 
                        // If logged in display this navbar
                        <>
                        <Nav className="me-auto">
                            
                        </Nav>
                        <Nav>
                            <Nav.Link href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg>
                            </Nav.Link>
                            <Nav.Link href="/myProfile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </Nav.Link>
                            <NavDropdown title={
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                    </svg>
                                    {counter ? 
                                    <span className="counter">{counter}</span>
                                    : "" }
                                </span>
                                } id="navbarScrollingDropdown">
                                <NavDropdown.ItemText>Friend Requests</NavDropdown.ItemText>
                                {notifications.map((username,index) => (
                                    <div key={index}>
                                        <div className="notification">
                                            {username.Username}
                                            <Button onClick={() => removeRequest(username.UserId)} variant="danger" size="sm" className="float-end">&#x2715;</Button> 
                                            <Button onClick={() => acceptRequest(username.UserId)} variant="success" size="sm" className="float-end">&#x2714;</Button>
                                        </div>
                                    </div>     
                                ))}
                                <NavDropdown.Divider />         
                            </NavDropdown>
                            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                        </Nav>
                        </>
                    
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;