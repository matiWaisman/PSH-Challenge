import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = (props) => {
  const { eventsArray, setShowHome, setCurrentHackaton } = props;
  const handleClick = (e) => {
    setCurrentHackaton(e);
    setShowHome(false);
  };

  const handleBrand = () => {
    setShowHome(true);
  };
  return (
    <>
      <Navbar bg="danger" expand="lg">
        <Container className="navbar-text">
          <button onClick={handleBrand}>
            <Navbar.Brand>
              <img
                src="https://wearepsh.com/static/images/logo_red_psh.svg"
                alt="Psh Logo"
                className="img-logo"
              ></img>{" "}
              Hackatons
            </Navbar.Brand>
          </button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Hackatons List" id="basic-nav-dropdown">
                {eventsArray.map((event, i) => (
                  <button
                    key={event.id}
                    value={event}
                    name="event"
                    onClick={() => {
                      handleClick(i);
                    }}
                  >
                    <NavDropdown.Item>
                      {event.place} {event.date}
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
