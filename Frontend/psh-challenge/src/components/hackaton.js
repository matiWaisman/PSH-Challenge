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
    currentHackatonPosition,
    hallOfFamePosition,
  } = props;

  let isHallOfFame = false;
  if (currentHackatonPosition === hallOfFamePosition) {
    isHallOfFame = true;
  }

  console.log(currentHackatonPosition);

  return (
    <>
      <Row>
        <Col>
          {currentHackatonPosition === hallOfFamePosition ? (
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
            {hackatonsArray[currentHackatonPosition].place}
            {hackatonsArray[currentHackatonPosition].date}
          </h1>
          {hackatonsArray[currentHackatonPosition].developers.map(
            (developer, i) => (
              <Developer
                developer={developer}
                i={i}
                key={developer.id}
                sortScores={sortScores}
                isHallOfFame={isHallOfFame}
              />
            )
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Hackaton;
