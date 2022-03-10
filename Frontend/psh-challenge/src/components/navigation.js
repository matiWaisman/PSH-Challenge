import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = (props) => {
  const { eventsArray, setCurrentEvent, setShowHome } = props;
  const handleClick = (e) => {
    console.log(e);
    setCurrentEvent(e);
    setShowHome(false);
  };

  const handleBrand = () => {
    setShowHome(true);
  };
  return (
    <>
      <Navbar bg="danger" expand="lg">
        <Container className="text-light">
          <button onClick={handleBrand}>
            <Navbar.Brand>Psh Hackatons</Navbar.Brand>
          </button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Hackatons" id="basic-nav-dropdown">
                {eventsArray.map((event, i) => (
                  <button
                    key={event.id}
                    value={event}
                    name="event"
                    onClick={() => {
                      handleClick(event);
                    }}
                  >
                    <NavDropdown.Item>
                      {event.place} {event.year}
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
