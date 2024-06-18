import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import "../common_css/home.css";
import Card from "react-bootstrap/Card";
import MainNavbar from "../Common_pages/Main_navbar";
import MainFooter from "../Common_pages/Main_footer";

const About = () => {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row>
          <div className="text-center pt-5 py-5">
            <h1>ABOUT</h1>
            <p>INDIA'S HOME FOR TRENDS AND STYLE.</p>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center align-items-center w-100">
            <Card className="p-0 overflow-hidden">
              <Card.Img
                variant="top"
                src="/about/bgimg1.jpg"
                className="ab_img"
              />
            </Card>
          </div>
        </Row>
        <Row className=" p-5">
          <h3 className="abt_cnt">
            International Fashion. Superior Quality. Wide Range. Unmatched
            Affordability.
          </h3>
          <p className=" display-1">
            For The Young. And the Young At Heart. That’s Us.
          </p>
          <p>
            Launched in the UAE in May 2004, FASHION BEAT is now in over 850+
            stores across 20 countries. We opened doors in Indore, India, in
            2006. There has been no looking back. Our reach in the country today
            extends to 200+ cities, boasting a loyal customer base of close to
            35 million. We also provide a hassle-free, 24 X 7 shopping
            experience on MAXFASHION.COM & FASHION BEAT APPS where our customers
            can choose from a variety of 17,000+ styles.
          </p>
          <p>
            We believe, FASHION IS FOR EVERYONE. From the Gen Z shopper looking
            for cutting-edge global fashion, to each and everyone in the family
            seeking quality essentials, FASHION BEAT has it all.
          </p>
          <p>
            Led by a passion for fashion, our designers create 3,000+ styles
            every season. We offer apparel, footwear & accessories to match
            every occasion, event, and pocket for MEN, WOMEN & KIDS.
          </p>
          <p>
            Our digital presence, with its rapidly increasing reach of 1.1
            MILLION INSTA FOLLOWERS, 1.8 MILLION FACEBOOK FANS & 4 MILLION APP
            USERS, plays a vital role in engaging and servicing customers from
            store-to-home - in a few clicks.
          </p>
        </Row>
      </Container>
      <MainFooter />
    </div>
  );
};

export default About;
