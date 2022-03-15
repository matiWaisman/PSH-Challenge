import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  const { isLogged, setIsLogged, setCurrentUser, currentUser } = props;
  const navigate = useNavigate();

  const [formText, setFormText] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formText;

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  };

  const handleChange = (e) => {
    setFormText({
      ...formText,
      [e.target.name]: e.target.value,
    });
  };

  const checkUser = async () => {
    const rawResponse = await fetch(
      "http://localhost:5000/api/v1/users/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formText.email,
          password: formText.password,
        }),
      }
    );
    const content = await rawResponse.json();
    if (rawResponse.status === 401) {
      window.alert(content.message);
    }
    if (rawResponse.status === 200) {
      setIsLogged(true);
      setFormText({
        email: "",
        password: "",
      });
      setCurrentUser(content.user);
      navigate("/");
    }
  };

  if (isLogged) {
    navigate("/logout");
  }

  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <div className="d-flex justify-content-center my-5">
            <h1>Login</h1>
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
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div className="d-flex justify-content-center my-5">
            <Button variant="success" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Login;
