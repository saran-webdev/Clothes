import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  userRefresh
} from "../Redux/ReduxCartData/CartDataAction";
import { decrementCount } from "../Redux/ReduxBatchData/BatchDataAction";
import MainNavbar from "../Common_pages/Main_navbar";
import "../Css_pages/Card.css";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import MainFooter from "../Common_pages/Main_footer";
import { message, notification } from "antd";
import { BiBasket } from "react-icons/bi";

const Cart = () => {
  const count = useSelector((state) =>
    state.cartData.userData ? state.cartData.userData.cart.length : 0
  );
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [cartData, setCartData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [api, contextHolder] = notification.useNotification();
  const [messageApi] = message.useMessage();

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/cart-get/${userId}`);
      const filteredCartData = response.data.filter((item) => item.productId); // Filter out items without productId
      // Initialize quantity property to 1 for each item
      const cartItemsWithQuantity = filteredCartData.map((item) => ({
        ...item,
        quantity: 1,
        totalPrice: item.productId.productPrice // Initialize totalPrice with product price
      }));
      setCartData(cartItemsWithQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    // Optimistically remove item from UI
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item.productId._id !== productId)
    );
    const response = await dispatch(removeFromCart(productId));
    console.log(response);
    if (response.status === 200) {
      dispatch(userRefresh());
      api.success({
        description: "Cart Item Deleted.",
        duration: 2
      });
    }
    dispatch(decrementCount(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.productId._id === productId) {
        const newQuantity = (item.quantity || 0) + 1;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.productId.productPrice // Update totalPrice based on new quantity
        };
      }
      return item;
    });
    setCartData(updatedCartData);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.productId._id === productId && item.quantity > 1) {
        const newQuantity = (item.quantity || 0) - 1;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.productId.productPrice // Update totalPrice based on new quantity
        };
      }
      return item;
    });
    setCartData(updatedCartData);
  };

  // Calculate total price of all items in the cart
  const totalCartPrice = cartData.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const handleCheckout = async () => {
    api.error({
      description: "Ingration Work Going On",
      duration: 1
    });
  };

  return (
    <div>
      <MainNavbar />
      <Container>
        <Row>
          <Col xs={12} lg={6}>
            {Array.isArray(cartData) && cartData.length > 0 ? (
              cartData.map((cartItem, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body className="d-flex">
                    <div className="d-flex flex-column">
                      <Card.Img
                        variant="top"
                        src={cartItem.productId.productImage}
                        alt={cartItem.productId.productName}
                        // className="w-25"
                        className=" img-fluid "
                      />
                      <Card.Title className="mx-3 mt-3">
                        {cartItem.productId.productName}
                      </Card.Title>
                      <Card.Text className="mx-3">
                        <h2>Price: ₹{cartItem.productId.productPrice}</h2>
                      </Card.Text>
                      <div className="d-flex align-items-center gap-2 ms-4">
                        {/* <Button variant="outline-secondary">-</Button> */}
                        <AiOutlineMinus
                          onClick={() =>
                            handleDecreaseQuantity(cartItem.productId._id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <span className="mx-1">{cartItem.quantity}</span>
                        {/* <Button variant="outline-secondary">+</Button> */}
                        <AiOutlinePlus
                          onClick={() =>
                            handleIncreaseQuantity(cartItem.productId._id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <AiOutlineDelete
                          className="fs-4"
                          onClick={() =>
                            handleRemoveFromCart(cartItem.productId._id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </Col>
          <Col xs={12} lg={6}>
            <div className="TotalCart_Items">
              <Row>
                <div className="d-flex flex-column w-100 mt-5">
                  <Col className="d-flex justify-content-center align-items-center flex-column">
                    <h1>Total items in cart: {count}</h1>
                    <h4 className=" mt-4">
                      Total cart Price: ₹{totalCartPrice}
                    </h4>
                    <Button className="w-75 mt-4" onClick={handleCheckout}>
                      <div className=" d-flex justify-content-center align-items-center gap-2">
                        Checkout
                        <BiBasket className=" fs-4" />
                      </div>
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center mt-4">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/019/080/436/large_2x/popular-online-payment-methods-logo-with-white-background-transparent-with-logotype-gateway-icon-set-for-website-free-vector.jpg"
                      alt=""
                      srcSet=""
                      className="img-fluid"
                    />
                  </Col>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        {contextHolder}
      </Container>
      <MainFooter />
    </div>
  );
};

export default Cart;
