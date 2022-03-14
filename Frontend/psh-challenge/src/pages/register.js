import React, { useState, useEffect } from "react";
import Logout from "../components/logout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = (props) => {
  const { isLogged, setIsLogged } = props;

  const [formText, setFormText] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const { email, name, password, password2 } = formText;

  if (isLogged) {
    <Logout isLogged={isLogged} setIsLogged={setIsLogged} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormText({
      ...formText,
      [e.target.name]: e.target.value,
    });
  };

  const checkUser = () => {};

  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <div className="d-flex justify-content-center my-5">
            <h1>Register page</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter your password again please</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Register;
