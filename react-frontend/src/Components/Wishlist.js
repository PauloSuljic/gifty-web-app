import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router";

import WishlistForm from "./WishlistForm";
import WishlistEditForm from "./WishlistEditForm";

const Wishlist = ({ user }) => {

    const [details] = useState({
        itemName: "",
        itemPrice: "",
        itemLink: ""
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClose = () => setShowEditModal(false);
    const handleEditShow = () => setShowEditModal(true);

    const [wishlist, setWishlist] = useState([]);
    
    function updateWishlist(){
        const loggedInW = localStorage.getItem("wishlist");
        if (loggedInW) {
            const foundW = JSON.parse(loggedInW);
            setWishlist(foundW);
        }
    }

    const fetchWishlist = async() => {
        const wishlistData = await fetch('http://localhost:5000/api/wishlist');
        const items = await wishlistData.json(); 

        // Find current user's wishlist
        const result = items.filter(item => item.UserId === user.UserId);
        
        if (result){
            localStorage.setItem('wishlist', JSON.stringify(result));
        }
    }
    
    function deleteItem(itemId){
        fetch(`http://localhost:5000/api/wishlist/${itemId}`,{
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
        .then(fetchWishlist)
        .then(updateWishlist)
    }

    function editItem(item){

        handleEditShow();

        details.itemId= item.ItemId;
        details.itemName= item.ItemName;
        details.itemPrice= item.ItemPrice;
        details.itemLink= item.ItemLink;
       
        // fetch('http://localhost:5000/api/wishlist',{
        //     method:"PUT",
        //     headers:{
        //         'Accept' : 'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({
        //         ItemName: details.itemName,
        //         ItemPrice: details.itemPrice,
        //         ItemLink: details.itemLink,
        //         Reserved: false,
        //         UserId: user.UserId
        //     })
        // })
        // .then(response => {
        //     return response.json()
        // })
        // .then(fetchWishlist)
        // .then(updateWishlist) 
    }

    useEffect(() => {

        let isMounted = true;

        const fetchWishlist = async() => {
            const wishlistData = await fetch('http://localhost:5000/api/wishlist');
            const items = await wishlistData.json(); 
    
            // Find current user's wishlist
            const result = items.filter(item => item.UserId === user.UserId);
            
            if (result){
                localStorage.setItem('wishlist', JSON.stringify(result));
            }
        }

        if (isMounted){
            fetchWishlist()
            .then(updateWishlist);
        }

        return () => {
            isMounted = false;
        } 
    },[user.UserId])

    // If user is logged in redirect him to Login Page
    if (!localStorage.getItem("user")){
        return <Redirect to="/login" />
    }

    return(
        <Container>
            <h1>Hello wishlist</h1>
            <br/>

            {/*Display Items*/}
            <Row xs={1} sm={2} md={3}>
                {wishlist.map((item, index) => (
                    <div key={item.ItemId} className="itemCard">
                        <Col>
                        <Card>
                            <a href={item.ItemLink} className="itemLink" target="_blank" rel="noreferrer">
                            <Card.Header>{index + 1}</Card.Header>
                            <Card.Body>
                                <Card.Title>{item.ItemName}</Card.Title>
                                <Card.Text>{item.ItemPrice}</Card.Text>
                            </Card.Body>
                            </a>
                            <Card.Footer>
                                <Button onClick={()=>editItem(item)} className="editButton" variant="primary">Edit</Button>
                                &nbsp;
                                <Button onClick={()=>deleteItem(item.ItemId)} className="editButton" variant="danger">Delete</Button>                            
                            </Card.Footer>
                        </Card>
                        </Col>
                    </div>
                ))}
            </Row>
            <br/>

            {/*Add new Item*/}
            <Row xs={3} sm={3} md={3}>
                <Col>
                </Col>
                <div className="addItemCard" onClick={handleShow} >
                    <Col>
                        <Card border="light" style={{ background: 'transparent' }}>
                            <Card.Header>{wishlist.length + 1}</Card.Header>
                            <Card.Body>
                                <Card.Title>Add New Item</Card.Title>
                                <Card.Text>+</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
                <Col>
                </Col>
            </Row>
            <br/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WishlistForm user={user} fetchWishlist={fetchWishlist} updateWishlist={updateWishlist} close={handleClose}/>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleEditClose}>
                <Modal.Header >
                <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WishlistEditForm details={details} user={user} fetchWishlist={fetchWishlist} updateWishlist={updateWishlist} close={handleEditClose}/>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Wishlist;