import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="my-5 d-flex justify-content-center">
        <h1>Code 401, you are not allowed to be here</h1>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="danger" onClick={() => navigate("/")}>
          {" "}
          Go back
        </Button>
      </div>
    </>
  );
};

export default NotAllowed;
