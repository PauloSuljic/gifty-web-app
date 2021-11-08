import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";



const Cards = () => {
    return(
        <div className="cards">
        <Row xs={1} md={4}>
            <Col>
            <Link to="/addfriend" style={{ textDecoration: 'none' }}>
            <Card text={'light' ? 'dark' : 'white'} className="card">
                <Card.Body>
                <Card.Title>Add Friends</Card.Title>
                <Card.Text>
                    Find and add new friends on Gifty
                </Card.Text>
                <Card.Text>
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </Card.Text>
                </Card.Body>
            </Card>
            </Link>
            </Col>
            <Col>
            <Link to="/friends" style={{ textDecoration: 'none' }}>
            <Card text={'light' ? 'dark' : 'white'} className="card">
                <Card.Body>
                <Card.Title>Friends</Card.Title>
                <Card.Text>
                    Check the list of all your friends
                </Card.Text>
                <Card.Text>
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                </Card.Text>
                </Card.Body>
            </Card>
            </Link>
            </Col>
            <Col>
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
            <Card text={'light' ? 'dark' : 'white'} className="card">
                <Card.Body>
                <Card.Title>Wishlist</Card.Title>
                <Card.Text>
                    Manage and update your wishlist
                </Card.Text>
                <Card.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-gift-fill" viewBox="0 0 16 16">
                <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z"/>
                </svg>
                </Card.Text>
                </Card.Body>
            </Card>
            </Link>
            </Col>
            <Col>
            <Link to="/calendar" style={{ textDecoration: 'none' }}>
            <Card text={'light' ? 'dark' : 'white'} className="card">
                <Card.Body>
                <Card.Title>Calendar</Card.Title>
                <Card.Text>
                    Prepare for incoming birthdays
                </Card.Text>
                <Card.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-calendar-day-fill" viewBox="0 0 16 16">
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16v9zm-4.785-6.145a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43c0 .238.192.425.43.425zm.336.563h-.672v4.105h.672V8.418zm-6.867 4.105v-2.3h2.261v-.61H4.684V7.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V9.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105z"/>
                </svg>
                </Card.Text>
                </Card.Body>
            </Card>
            </Link>
            </Col>

        </Row>
        </div>
    );
}

export default Cards;
