import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

const WishlistForm = ({ user, fetchWishlist, updateWishlist, close }) => {

    const [details] = useState({
        itemName: "",
        itemPrice: "",
        itemLink: ""
    });

    const submitHandler = e => {
        e.preventDefault();
        
        details.itemName= e.target.itemName.value;
        details.itemPrice= e.target.itemPrice.value;
        details.itemLink= e.target.itemLink.value;
       
        fetch('http://localhost:5000/api/wishlist',{
            method:"POST",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ItemName: details.itemName,
                ItemPrice: details.itemPrice,
                ItemLink: details.itemLink,
                Reserved: false,
                UserId: user.UserId
            })
        })
        .then(response => {
            return response.json()
        }) 
        // .then((result)=>{
        //     alert(result);
        // },
        // (error)=>{
        //     alert('Failed');
        // })
        .then(fetchWishlist)
        .then(updateWishlist)
        .then(close);
    }
    

    return(
        <Form onSubmit={submitHandler}>
            <Row>
            <Form.Group as={Row} className="mb-3" controlId="itemName">
                <Col>
                <Form.Label className="form-label">Name</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" placeholder="Item Name" required/>
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="itemPrice">
                <Col>
                <Form.Label className="form-label">Price</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" placeholder="Item Price" required/>
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="itemLink">
                <Col>
                <Form.Label className="form-label">Link</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" placeholder="Item Link" required/>
                </Col>
            </Form.Group>
            </Row>

            <Button className="signup-button" variant="primary" type="submit">
                Add Item
            </Button>
        </Form>
    );
}

export default WishlistForm;