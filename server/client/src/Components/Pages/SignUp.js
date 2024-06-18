import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { message, notification } from "antd";
import "../Css_pages/Card.css";

const SignUp = () => {
  const BACKENDURL = process.env.REACT_APP_BACKEND_URL;
  const [api, contextHolder] = notification.useNotification();
  const [messageApi] = message.useMessage();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      await axios.post(`${BACKENDURL}/register`, formData);
      api.success({
        description: "User registered successfully!",
        duration: 1
      });
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      api.error({
        description: "User already registered.",
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
    <div className=" sign-card-container d-flex justify-content-center align-items-center vh-100 ">
      <Container>
        <span className=" d-flex justify-content-center align-items-center flex-column sign-card">
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <span className=" d-flex justify-content-center align-items-center gap-5">
              <>
                <Button variant="primary" type="submit" className=" mt-3">
                  Sign Up
                </Button>
              </>
              <>
                <p className=" mt-4">or</p>
              </>
              <>
                <Button variant=" outline-secondary">
                  <FcGoogle
                    className=" fs-1 mt-3"
                    onClick={handleGoogle}
                    style={{ cursor: "pointer" }}
                  />
                </Button>
              </>
            </span>
          </Form>
        </span>
        {contextHolder}
      </Container>
    </div>
  );
};

export default SignUp;
