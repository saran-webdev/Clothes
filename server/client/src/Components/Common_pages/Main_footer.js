import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../Css_pages/footer.css";

const MainFooter = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <footer className="footer">
            <Container>
              <Row>
                <Col md={6} lg={3} className="footer-col">
                  <h4>company</h4>
                  <ul>
                    <li>
                      <a href="/about">about us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact us</a>
                    </li>
                    <li>
                      <a href="/privacy">privacy policy</a>
                    </li>
                  </ul>
                </Col>
                <Col md={6} lg={3} className="footer-col">
                  <h4>get help</h4>
                  <ul>
                    <li>
                      <a href="/faq">FAQ</a>
                    </li>
                    <li>
                      <a href="/order">order status</a>
                    </li>
                    <li>
                      <a href="/payment">payment options</a>
                    </li>
                  </ul>
                </Col>
                <Col md={6} lg={3} className="footer-col">
                  <h4>online shop</h4>
                  <ul>
                    <li>
                      <a href="/men">MEN</a>
                    </li>
                    <li>
                      <a href="/women">WOMEN</a>
                    </li>
                    <li>
                      <a href="/kids">KIDS</a>
                    </li>
                  </ul>
                </Col>
                <Col md={6} lg={3} className="footer-col">
                  <h4>follow us</h4>
                  <div className="social-links">
                    <a href="#">
                      <FaFacebook />
                    </a>
                    <a href="#">
                      <FaTwitter />
                    </a>
                    <a href="#">
                      <FaInstagram />
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </footer>
        </Row>
        <Row>
          <p className="text-center text-white bg-black p-4 m-0">
            Copyright © 2023 DESIGN SHOE | Powered by DESIGN SHOE
          </p>
        </Row>
      </Container>
    </>
  );
};

export default MainFooter;
