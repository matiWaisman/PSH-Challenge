import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Developer from "./developer";

const Hackaton = (props) => {
  const { currentEvent } = props;
  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          <h1 className="my-5 d-flex justify-content-center">
            {currentEvent.place} {currentEvent.year}
          </h1>
          {currentEvent.developers.map((developer, i) => (
            <Developer developer={developer} i={i} key={developer.id} />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Hackaton;
