import React, { useEffect, useState } from "react";
import "../orderingFilter.css";
const OrderingFilter = (props) => {
  const { setSortScores } = props;
  return (
    <div className="d-flex flex-row-reverse my-5">
      <details className="custom-select">
        <summary className="radios">
          <input
            type="radio"
            name="item"
            id="default"
            title="Order by:"
            defaultChecked
          ></input>
          <input
            type="radio"
            name="item"
            id="sorted"
            title="Best developers"
            onClick={() => {
              setSortScores(true);
            }}
          ></input>
          <input
            type="radio"
            name="item"
            id="every"
            title="Every developer"
            onClick={() => {
              setSortScores(false);
            }}
          ></input>
        </summary>
        <ul className="list">
          <li>
            <label htmlFor="sorted">Best developers</label>
          </li>
          <li>
            <label htmlFor="every">Every developer</label>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default OrderingFilter;
