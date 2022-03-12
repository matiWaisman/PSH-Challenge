import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = (props) => {
  const {
    hackatonsArray,
    setShowHome,
    setCurrentHackatonPosition,
    hallOfFamePosition,
  } = props;

  const handleClick = (i) => {
    setCurrentHackatonPosition(i);
    setShowHome(false);
  };

  const handleShowHome = () => {
    setShowHome(true);
  };
  return (
    <>
      <Navbar bg="danger" expand="lg">
        <Container className="navbar-text">
          <button onClick={handleShowHome}>
            <Navbar.Brand>
              <img
                src="https://wearepsh.com/static/images/logo_red_psh.svg"
                alt="Psh Logo"
                className="img-logo"
              ></img>
              Hackatons
            </Navbar.Brand>
          </button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Hackatons List" id="basic-nav-dropdown">
                {hackatonsArray.map((hackaton, i) => (
                  <button
                    key={hackaton.id}
                    onClick={() => {
                      handleClick(i);
                    }}
                  >
                    <NavDropdown.Item
                      className={hallOfFamePosition === i ? "golden" : ""}
                    >
                      {hackaton.place} {hackaton.date}
                    </NavDropdown.Item>
                  </button>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
