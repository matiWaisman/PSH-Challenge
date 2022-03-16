import React from "react";
import "../developer.css";

const Developer = (props) => {
  const { developer, i, sortScores, isHallOfFame } = props;
  console.log(isHallOfFame);
  var borderColorClass = "";
  if (sortScores || isHallOfFame) {
    if (i === 0) {
      borderColorClass = "first";
    }
    if (i === 1) {
      borderColorClass = "second";
    }
    if (i === 2) {
      borderColorClass = "third";
    }
  }
  return (
    <>
      <div className="card-container">
        <div className={`${borderColorClass} card-box`}>
          <div className="card-heading">
            <h2>
              {developer.name.first} {developer.name.last}
            </h2>
          </div>
          <img src={developer.picture.large} alt={developer.name.first}></img>
          <div className="card-text">
            <p>{developer.email}</p>
            <p>Age: {developer.age}</p>
            <p>Gender: {developer.gender}</p>
            <p>
              Score: <span className="score">{developer.score.toFixed(2)}</span>
            </p>
            <p>{isHallOfFame ? `Hackaton: ${developer.hackaton}` : ""}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Developer;
