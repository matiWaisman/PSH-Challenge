import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Logout = (props) => {
  const { isLogged, setIsLogged } = props;
  return (
    <Row>
      <Col></Col>
      <Col>
        <div className="d-flex justify-content-center my-5">
          <h1>Login page</h1>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Logout;
