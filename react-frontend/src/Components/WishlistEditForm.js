import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

const WishlistEditForm = ({ details, user, fetchWishlist, updateWishlist, close }) => {

    const [newDetails] = useState({
        itemId: "",
        itemName: "",
        itemPrice: "",
        itemLink: ""
    });

    const submitHandler = e => {
        e.preventDefault();
        
        newDetails.itemId= details.itemId;
        newDetails.itemName= e.target.itemName.value;
        newDetails.itemPrice= e.target.itemPrice.value;
        newDetails.itemLink= e.target.itemLink.value;
       
        fetch('http://localhost:5000/api/wishlist',{
            method:"PUT",
            headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ItemId: newDetails.itemId,
                ItemName: newDetails.itemName,
                ItemPrice: newDetails.itemPrice,
                ItemLink: newDetails.itemLink,
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
                <Form.Control className="form-input" type="text" defaultValue={details.itemName} />
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="itemPrice">
                <Col>
                <Form.Label className="form-label">Price</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" defaultValue={details.itemPrice} />
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="itemLink">
                <Col>
                <Form.Label className="form-label">Link</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" defaultValue={details.itemLink} />
                </Col>
            </Form.Group>
            </Row>

            <Button className="signup-button" variant="primary" type="submit">
                Add Item
            </Button>
        </Form>
    );
}

export default WishlistEditForm;