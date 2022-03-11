import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = (props) => {
  const { eventsArray, setShowHome, setCurrentHackaton } = props;
  const handleClick = (e) => {
    setCurrentHackaton(e);
  };

  if (eventsArray.length === 0) {
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
            {eventsArray.map((event, i) => (
              <button
                key={event.place}
                value={event}
                name="event"
                onClick={() => {
                  handleClick(i);
                  setShowHome(false);
                }}
              >
                <ListGroup.Item className="my-1">
                  {event.place} {event.date}
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
