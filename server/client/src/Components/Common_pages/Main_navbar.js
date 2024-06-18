import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Css_pages/MainNavbar.css"; // Import your custom CSS file for styling
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { userRefresh } from "../Redux/ReduxCartData/CartDataAction";

const MainNavbar = () => {
  const jwtToken = localStorage.getItem("userId");
  const jwtExpToken = localStorage.getItem("token_exp");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  // const count = useSelector((state) => state.cartData.cartItems.length);
  // const countAction = useSelector((state) => state.cartData);
  const count = useSelector((state) =>
    state.cartData.userData ? state.cartData.userData.cart.length : 0
  );

  // console.log(countAction);

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token_exp");
    dispatch(userRefresh());
    api.success({
      description: "Successfully LogOut",
      duration: 1
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (jwtExpToken) {
        const currentTime = new Date();
        const [hours, minutes, ampm] = jwtExpToken.split(/[:\s]/);
        let expirationDate = new Date();
        expirationDate.setHours((hours % 12) + (ampm === "PM" ? 12 : 0));
        expirationDate.setMinutes(minutes);

        if (currentTime > expirationDate) {
          handleLogout();
        }
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [jwtExpToken]);

  const items = jwtToken
    ? [{ key: "3", label: <a onClick={handleLogout}>Log out</a> }]
    : [
        {
          key: "1",
          label: <div onClick={() => navigate("/signin")}>Sign In</div>
        },
        {
          key: "2",
          label: <div onClick={() => navigate("/signup")}>Sign Up</div>
        }
      ];

  const handleAction = (action, description) => {
    if (!userId) {
      api.open({
        message: "Hey!",
        description: `Please log in to view your ${description}.`,
        icon: <SmileOutlined style={{ color: "#108ee9" }} />
      });
    } else {
      navigate(`/${action}`);
    }
  };

  const handleCartClick = () => {
    handleAction("cart", "cart");
  };

  const handleFavoriteClick = () => {
    handleAction("favorite", "Favorite");
  };

  const handleOrderClick = () => {
    handleAction("order", "Order");
  };

  return (
    <div className="main-navbar p-0 m-0 position-sticky top-0 z-3">
      <Container fluid>
        <Row className="bg-black extra py-2 d-none d-sm-flex z-3">
          <Col
            xs={12}
            sm={6}
            className="text-white d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <FaShippingFast />
            <span className="mx-2">|</span>
            <span className="ms-2">Free Shipping</span>
          </Col>
          <Col
            xs={12}
            sm={6}
            className="text-white d-flex justify-content-center justify-content-md-end align-items-center"
          >
            <FiDownload />
            <span className="ms-2">Download Our App</span>
            <span className="mx-2">|</span>
            <span>Help</span>
          </Col>
        </Row>
        <Row className="z-3 bg-white">
          {["sm"].map((expand) => (
            <Navbar
              collapseOnSelect
              expand="sm"
              key={expand}
              // expand={expand}
              className="z-3 text-white p-0 m-0"
            >
              <Container fluid>
                <Navbar.Brand href="/">
                  <img
                    src="../Designer.png"
                    alt=""
                    srcSet=""
                    width={70}
                    className=" p-0 m-0"
                  />
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />

                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <img
                        src="../Designer.png"
                        alt=""
                        srcSet=""
                        width={100}
                        className=" p-0 m-0"
                      />
                      Designer | Shoe
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="me-auto z-3 fw-bold p-0 m-0">
                      <Nav.Link href="/women">Women</Nav.Link>
                      <Nav.Link href="/men">Men</Nav.Link>
                      <Nav.Link href="/kids">Kids</Nav.Link>
                    </Nav>
                    <Nav className="z-3">
                      {/* <Nav.Link onClick={handleFavoriteClick} className="z-3">
                        {contextHolder}
                        <AiOutlineHeart className="fs-4" />
                      </Nav.Link> */}
                      <Nav.Link onClick={handleCartClick} className="z-3">
                        <Badge count={count}>
                          {contextHolder}
                          <BiCartAlt className="fs-4" />
                        </Badge>
                      </Nav.Link>
                      <Nav.Link onClick={handleOrderClick} className="z-3">
                        {contextHolder}
                        <AiOutlineShopping className="fs-4" />
                      </Nav.Link>
                      <Nav.Link className="z-3">
                        <Dropdown
                          menu={{ items }}
                          placement="topRight"
                          arrow={{ pointAtCenter: true }}
                        >
                          <Avatar icon={<UserOutlined />} className=" fs-4 " />
                        </Dropdown>
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </Row>
        <Row>
          <h6 className="Adds py-2 m-0 text-center bg-dark">
            <marquee behavior="" direction="">
              <p className=" p-0 m-0">
                Buy 3 at 30% off / Buy 2 at 20% off + Extra 400 off on 1999.
                Code:SD400 | Free shipping on ALL orders!
              </p>
            </marquee>
          </h6>
        </Row>
      </Container>
    </div>
  );
};

export default MainNavbar;
