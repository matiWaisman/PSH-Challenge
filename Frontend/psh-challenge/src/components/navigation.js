import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const Navigation = (props) => {
  const { hackatonsArray, setCurrentHackatonPosition, hallOfFamePosition } =
    props;
  const handleClick = (i) => {
    setCurrentHackatonPosition(i);
  };
  return (
    <>
      <Navbar bg="danger" expand="lg">
        <Container className="navbar-text">
          <NavLink className="navbar-item" activeClassName="is-active" to="/">
            <Navbar.Brand>
              <img
                src="https://wearepsh.com/static/images/logo_red_psh.svg"
                alt="Psh Logo"
                className="img-logo"
              ></img>
              Hackatons
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {hackatonsArray.length < 1 ? (
                ""
              ) : (
                <NavDropdown title="Hackatons List" id="basic-nav-dropdown">
                  {hackatonsArray.map((hackaton, i) => (
                    <NavLink
                      className="navbar-item"
                      activeClassName="is-active"
                      to="/hackatons"
                    >
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
                    </NavLink>
                  ))}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/login"
          >
            <AiOutlineUser size={40} />
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
