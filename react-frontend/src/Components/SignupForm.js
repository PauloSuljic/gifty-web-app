import { Form, Row, Col, Button } from "react-bootstrap";

const SignupForm = ({handleSignup}) => {

    return(
        <Form onSubmit={handleSignup}>
            <Row>
            <Form.Group as={Row} className="mb-3" controlId="firstName">
                <Col>
                <Form.Label className="form-label">First Name</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" placeholder="First Name" required/>
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="lastName">
                <Col>
                <Form.Label className="form-label">Last Name</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" placeholder="Last Name" required/>
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="username">
                <Col>
                <Form.Label className="form-label">Username</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="text" placeholder="Username" required/>
                </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="emailAddress">
                <Col>
                <Form.Label className="form-label">Email address</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="email" placeholder="Email" required/>
                </Col>
            </Form.Group>
            </Row>
            
            <Row>
            <Form.Group as={Row} className="mb-3" controlId="password">
                <Col>
                <Form.Label className="form-label">Password</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="password" placeholder="Password" required/>
                </Col>
            </Form.Group>
            </Row>

            <Row>    
            <Form.Group as={Row} className="mb-3" controlId="rePassword">
            <Col>
                <Form.Label className="form-label">Re-Password</Form.Label>
            </Col>
            <Col>
                <Form.Control className="form-input" type="password" placeholder="Re-Password" required/>
            </Col>
            </Form.Group>
            </Row>

            <Row>
            <Form.Group as={Row} className="mb-3" controlId="dob">
                <Col>
                <Form.Label className="form-label">Date of Birth</Form.Label>
                </Col>
                <Col>
                <Form.Control className="form-input" type="date" placeholder="" required/>
                </Col>
            </Form.Group>
            </Row>

            <Button className="signup-button" variant="light" type="submit">
                Sign Up
            </Button>
            
        </Form>
    );
}

export default SignupForm;