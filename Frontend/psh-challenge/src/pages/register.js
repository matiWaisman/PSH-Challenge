import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formText, setFormText] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const { email, name, password, password2 } = formText;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitUser();
  };

  const handleChange = (e) => {
    setFormText({
      ...formText,
      [e.target.name]: e.target.value,
    });
  };

  const submitUser = async () => {
    const rawResponse = await fetch(
      "http://localhost:5000/api/v1/users/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formText.email,
          password: formText.password,
          password2: formText.password2,
          name: formText.name,
        }),
      }
    );
    const content = await rawResponse.json();
    if (rawResponse.status === 401) {
      let errorsArray = [];
      content.forEach((position) => {
        errorsArray.push(position.msg);
      });
      window.alert(errorsArray);
    }
    if (rawResponse.status === 200) {
      window.alert("User registered succesfully");
      setFormText({
        email: "",
        password: "",
        password2: "",
        name: "",
      });
      navigate("/login");
    }
  };

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
