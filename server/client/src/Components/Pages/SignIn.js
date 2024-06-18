import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { message, notification } from "antd";
import "../Css_pages/Card.css";
import { useDispatch } from "react-redux";
import { userAction } from "../Redux/ReduxCartData/CartDataAction";

const SignIn = () => {
  const dispatch = useDispatch();
  const BACKENDURL = process.env.REACT_APP_BACKEND_URL;
  const [api, contextHolder] = notification.useNotification();
  const [messageApi] = message.useMessage();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${BACKENDURL}/login`, formData);
      const { token } = data.data;
      localStorage.setItem("token", token);
      console.log(data);
      dispatch(userAction(data.data.user));
      const decodedToken = jwtDecode(token);
      const token_exp = decodedToken.exp;
      const userId = decodedToken._id;
      const userName = decodedToken.username;
      localStorage.setItem("userName", userName);
      const expirationDate = new Date(token_exp * 1000);
      const hours = expirationDate.getHours();
      const minutes = expirationDate.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedExpirationTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
      localStorage.setItem("token_exp", formattedExpirationTime);
      localStorage.setItem("userId", userId);
      api.success({
        description: "Successfully LogIn",
        duration: 1
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      api.error({
        description: "Internal Server Error",
        duration: 1
      });
    }
  };
  const handleGoogle = async () => {
    api.error({
      description: "Ingration Work Going On",
      duration: 1
    });
  };

  return (
    <div className="sign-card-container vh-100 d-flex justify-content-center align-items-center">
      <Container>
        <span className="d-flex justify-content-center align-items-center flex-column sign-card ">
          {/* <h1>Company Name</h1>  */}
          <h2 className="mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>
                <h4>Username</h4>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>
                <h4>Password</h4>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <span className="d-flex justify-content-center align-items-center gap-5">
              <Button variant="primary" type="submit" className="mt-3">
                Sign In
              </Button>
              <p className="mt-4">or</p>
              <FcGoogle
                className="fs-1 mt-3"
                onClick={handleGoogle}
                style={{ cursor: "pointer" }}
              />
            </span>
          </Form>
        </span>
        {contextHolder}
      </Container>
    </div>
  );
};

export default SignIn;
