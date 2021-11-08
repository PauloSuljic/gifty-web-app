import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
    return(
        <Container>
            <div className="about-page">
                
                <h2 className="about-sub-heading" id="about"><strong>GIFT WITHOUT THINKING</strong></h2>
                <p className="about-text" id="about">Have you ever struggled with finding a perfect gift for your beloved ones?
                <br/>
                <br/>
                <strong>Never again!</strong>
                <br/>
                <br/>
                Gifty allows you to connect with other users through friendship and view their wishlist.
                Each user creates his own wishlist where he adds items he would like to be gifted with.</p>
            </div>
        </Container>
    );
}

export default About;