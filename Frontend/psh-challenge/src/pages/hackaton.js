import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Developer from "../components/developer";
import OrderingFilter from "../components/orderingFilter";
import { useParams } from "react-router-dom";

const Hackaton = (props) => {
  const { sortScores, setSortScores, hackatonsArray, hallOfFamePosition } =
    props;
  const params = useParams();
  console.log(params.position);
  let isHallOfFame = false;
  if (params.position === hallOfFamePosition) {
    isHallOfFame = true;
  }

  return (
    <>
      <Row>
        <Col>
          {params.position === hallOfFamePosition ? (
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
            {hackatonsArray[params.position].place} {""}
            {hackatonsArray[params.position].date}
          </h1>
          {hackatonsArray[params.position].developers.map((developer, i) => (
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
