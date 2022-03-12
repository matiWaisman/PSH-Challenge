import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Developer from "./developer";
import OrderingFilter from "./orderingFilter";

const Hackaton = (props) => {
  const {
    sortScores,
    setSortScores,
    hackatonsArray,
    currentHackaton,
    hallOfFamePosition,
  } = props;

  let isHallOfFame = false;
  if (currentHackaton === hallOfFamePosition) {
    isHallOfFame = true;
  }

  console.log(currentHackaton);

  return (
    <>
      <Row>
        <Col>
          {currentHackaton === hallOfFamePosition ? (
            <></>
          ) : (
            <OrderingFilter
              setSortScores={setSortScores}
              sortScores={sortScores}
            />
          )}
        </Col>
        <Col>
          <h1 className="my-5 d-flex justify-content-center">
            {hackatonsArray[currentHackaton].place}{" "}
            {hackatonsArray[currentHackaton].date}
          </h1>
          {hackatonsArray[currentHackaton].developers.map((developer, i) => (
            <Developer
              developer={developer}
              i={i}
              key={developer.id}
              sortScores={sortScores}
              isHallOfFame={isHallOfFame}
            />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Hackaton;
