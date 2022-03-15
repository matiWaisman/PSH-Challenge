import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

const Home = (props) => {
  const {
    hackatonsArray,
    setShowHome,
    setCurrentHackatonPosition,
    hallOfFamePosition,
    isLogged,
  } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrentHackatonPosition(e);
    setShowHome(false);
  };

  if (!isLogged) {
    return (
      <>
        <div className="mt-5 d-flex justify-content-center">
          <h2>You need to log in to see the competitions</h2>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={() => navigate("/login")}>
            {" "}
            Login
          </Button>
        </div>
      </>
    );
  }

  if (hackatonsArray.length === 0) {
    return (
      <>
        <div className="my-5 d-flex justify-content-center">
          <h2>
            There aren't hackatons uploaded to the database, sorry for the
            inconvenience
          </h2>
        </div>
      </>
    );
  }
  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <div className="my-5 d-flex justify-content-center">
            <img
              src="https://wearepsh.com/static/images/logo_red_psh.svg"
              alt="Psh Logo"
              className="img-logo"
            ></img>
            <h1>Hackatons</h1>
          </div>
          <ListGroup>
            {hackatonsArray.map((hackaton, i) => (
              <button
                key={hackaton.place}
                onClick={() => {
                  handleClick(i);
                }}
              >
                <ListGroup.Item
                  className={hallOfFamePosition === i ? "my-1 golden" : "my-1"}
                >
                  {hackaton.place} {hackaton.date}
                </ListGroup.Item>
              </button>
            ))}
          </ListGroup>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Home;
