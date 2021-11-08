import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Redirect } from "react-router";

const Friends = ({user}) => {

    const [friendships, setFriendships] = useState([]);
    const [counter, setCounter] = useState(0);
    const [modalUser, setModalUser] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function updateFriends(){
    //     const loggedInW = localStorage.getItem("friends");
    //     if (loggedInW) {
    //         const foundW = JSON.parse(loggedInW);
    //         setFriendships(foundW);
    //     }
    // }

    const handleModal = (user) => {
        setModalUser(user);
        handleShow();
    }

    useEffect(() => {

        let isMounted = true;

        const fetchFriends = async() => {
            const fdata = await fetch('http://localhost:5000/api/friendships');
            const friendships = await fdata.json();

            const udata = await fetch('http://localhost:5000/api/users');
            const users = await udata.json();

            const usernames = []
            
            // Pending Friendships 
            const filteredFriendships = friendships.filter(friendship => 
                (friendship.RequestReceiver === user.UserId || friendship.RequestSender === user.UserId)
                && (friendship.StatusReceiver === true && friendship.StatusSender === true));

            filteredFriendships.forEach((friendship) => {
                if (user.UserId === friendship.RequestSender){
                    usernames.push(users.find(
                        user => user.UserId === friendship.RequestReceiver  
                    ));
                    setModalUser(users.find(
                        user => user.UserId === friendship.RequestReceiver  
                    ))
                }else{
                    usernames.push(users.find(
                        user => user.UserId === friendship.RequestSender  
                    ));
                    setModalUser(users.find(
                        user => user.UserId === friendship.RequestSender  
                    ))
                }
            });

            localStorage.setItem('friends', JSON.stringify(usernames));

            setCounter(usernames.length);
            
            setFriendships(usernames); 
        }

        if (isMounted){
            fetchFriends()
            //.then(updateFriends)
        }

        return () => {
            isMounted = false;
        } 
    },[user.UserId])

    if (!localStorage.getItem("user")){
        return <Redirect to="/login" />
    }
    
    return(
        <Container>
            <h1>Friends</h1>
            <h4>{counter}</h4>

            <Row xs={1} sm={2} md={3}>
                {friendships.map((friend, index) => (
                    <div key={friend.UserId} className="friendCard">
                        <Col>
                        <Card onClick={() => handleModal(friend)}>
                            <Card.Header>{index + 1}</Card.Header>
                            <Card.Body>
                                <Card.Title>{friend.Username}</Card.Title>
                                <Card.Text>{friend.PhotoFileName}</Card.Text>
                            </Card.Body>
                            {/* <Card.Footer>
                                <Button className="editButton" variant="primary">Edit</Button>
                                &nbsp;
                                <Button onClick={()=>deleteItem(item.ItemId)} className="editButton" variant="danger">Delete</Button>                            
                            </Card.Footer> */}
                        </Card>
                        </Col>
                        
                    </div>
                ))}
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title>{modalUser.Username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This is your friend {modalUser.Username}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Friends; 