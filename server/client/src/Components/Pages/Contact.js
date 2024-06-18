import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import MainNavbar from "../Common_pages/Main_navbar";
import MainFooter from "../Common_pages/Main_footer";

const Contact = () => {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="p-5">
          <h1>Contact us</h1>
          <p>
            We’re here to help you. Get in touch with us from any of these ways:
          </p>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={3}>
            <Card className="py-5 text-center border-0">
              <div className="d-flex justify-content-center">
                <FaFacebookSquare size={48} color="#000" />
              </div>
              <Card.Body>
                <Card.Title>FACEBOOK US</Card.Title>
                <Card.Text>
                  Connect with us on your favorite social network.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card className="p-5 text-center border-0">
              <div className="d-flex justify-content-center">
                <FaTwitterSquare size={48} color="#000" />
              </div>
              <Card.Body>
                <Card.Title>TWITTER US</Card.Title>
                <Card.Text>
                  Reach out in 140 characters! We’re @fashionindia
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card className="p-5 text-center border-0">
              <div className="d-flex justify-content-center">
                <IoIosCall size={48} color="#000" />
              </div>
              <Card.Body>
                <Card.Title>TALK TO US</Card.Title>
                <Card.Text>Monday to Sunday, 10:00 AM to 10:00 PM</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card className="p-5 text-center border-0">
              <div className="d-flex justify-content-center">
                <AiOutlineMail size={48} color="#000" />
              </div>
              <Card.Body>
                <Card.Title>Write to us</Card.Title>
                <Card.Text>
                  Drop us a line and we'll get back to you as fast as we can.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
};

export default Contact;
