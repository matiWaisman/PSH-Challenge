import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = (props) => {
  const { eventsArray, setCurrentEvent, setShowHome } = props;
  const handleClick = (e) => {
    setCurrentEvent(e);
  };
  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <h1 className="my-5 d-flex justify-content-center">Psh Hackatons</h1>
          <ListGroup>
            {eventsArray.map((event, i) => (
              <button
                key={event.place}
                value={event}
                name="event"
                onClick={() => {
                  handleClick(event);
                  setShowHome(false);
                }}
              >
                <ListGroup.Item className="my-1">
                  {event.place} {event.year}
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
