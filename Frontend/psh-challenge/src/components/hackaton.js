import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Developer from "./developer";
import OrderingFilter from "./orderingFilter";

const Hackaton = (props) => {
  const { sortScores, setSortScores, eventsArray, currentHackaton } = props;
  return (
    <>
      <Row>
        <Col>
          {" "}
          <OrderingFilter setSortScores={setSortScores} />
        </Col>
        <Col>
          <h1 className="my-5 d-flex justify-content-center">
            {currentHackaton.place} {currentHackaton.date}
          </h1>
          {eventsArray[currentHackaton].developers.map((developer, i) => (
            <Developer
              developer={developer}
              i={i}
              key={developer.id}
              sortScores={sortScores}
            />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Hackaton;
