import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const { currentUser, setCurrentUser, isLogged, setIsLogged } = props;
  const navigate = useNavigate();
  console.log(isLogged);
  const handleClick = (e) => {
    setIsLogged(false);
    setCurrentUser("");
    navigate("/login");
  };
  if (!isLogged) {
    navigate("/login");
  }
  return (
    <Row>
      <Col></Col>
      <Col>
        <div className="d-flex justify-content-center mt-5">
          <h1>Hi {currentUser} are you sure you want to log out?</h1>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleClick}>
            Logout
          </Button>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Logout;
