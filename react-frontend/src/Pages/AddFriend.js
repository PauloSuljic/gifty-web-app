import { useState } from "react";
import { Container, Form, InputGroup, Row, Col, Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router";

const AddFriend = ( {user} ) => {

    const [details] = useState({
        giftyID: ""
    });

    const [friendship, setFriendship] = useState({})

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [foundUser, setFoundUser] = useState({});

    const [exists, setExists] = useState(false);
    const [both, setBoth] = useState(false);

    const findUser = async details =>  {
        // Get all users
        const data = await fetch('http://localhost:5000/api/users');
        const users = await data.json(); 
        
        // Find current user
        const found = users.find(user => parseInt(details.giftyID) === user.UserId);
        checkIfRequestExists();

        if (found){
            setFoundUser(found);
            localStorage.setItem('foundUser', JSON.stringify(found));
            handleShow();
        }else{
            handleClose();
            alert("There is no user with that Gifty ID");
        } 
    }

    const checkIfRequestExists = async () => {

        const data = await fetch('http://localhost:5000/api/friendships');
        const friendships = await data.json();
        const friendship = friendships.find(friendship => (friendship.RequestSender === user.UserId 
            && friendship.RequestReceiver === parseInt(details.giftyID)) 
            || (friendship.RequestReceiver === user.UserId 
                && friendship.RequestSender === parseInt(details.giftyID))
            );
           
        if(friendship && friendship !== ""){
            setFriendship(friendship);
            setExists(true);
            if (friendship.StatusSender === true && friendship.StatusReceiver === true){
                setBoth(true);
            }else{
                setBoth(false);
            }
        }else{
            setExists(false);
        }
    }

    function sendRequest() {

        fetch('http://localhost:5000/api/friendships',{
            method:"POST",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                requestSender: user.UserId,
                requestReceiver: details.giftyID,
                statusSender: true,
                statusReceiver: false
            })
        })
        .then(response => {
            return response.json()
        }) 
        .then(handleClose);
    }

    function deleteFriendship (friendshipId) {
        fetch(`http://localhost:5000/api/friendships/${friendshipId}`,{
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
        .then(handleClose);
    }

    const searchHandler = e => {
        e.preventDefault();
        details.giftyID= e.target.findUser.value;
        localStorage.removeItem('foundUser');

        if (parseInt(details.giftyID) === user.UserId){
            alert("Cant search yoself bruv");
        }else{
            findUser(details);
        }
    }

    if (!localStorage.getItem("user")){
        return <Redirect to="/login" />
    }

    return(
        <Container>
            <h1>Find New Gifty Frined</h1>
            <Row>
                <Col>
                </Col>
                <Col>
                <Form onSubmit={searchHandler}>
                <Form.Group controlId="findUser">
                <InputGroup >
                    <Form.Control className="form-input" type="text" placeholder="Username#GiftyID" />
                    <Button variant="outline-light" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </Button>
                </InputGroup>
                </Form.Group>
                </Form>
                </Col>
                <Col>
                </Col>
            </Row>
            <br/>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title>Add New friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {foundUser.Username}
                    {exists && both ? 
                        <Button className="float-end" >Visit Profile</Button>
                    : exists ?
                        <Button className="float-end" onClick={() => deleteFriendship(friendship.FriendshipId)}>Cancel Friend Request</Button>
                    :   
                        <Button className="float-end" onClick={() => sendRequest()}>Send Friend Request</Button>
                    }
                </Modal.Body>
            </Modal>
            
        </Container>
    );
}

export default AddFriend;