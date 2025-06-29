import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarNav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import logo from "./../img/math-app.png";

function Nav({ searchQuery, setSearchQuery }) {
  let location = useLocation();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <div className="container-md">
        <div>
          <a href="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="" style={{ height: "2rem" }} className="me-2" />
            <span className="navbar-brand me-0 me-sm-3" style={{ verticalAlign: "middle" }}>
              Math Challenges
            </span>
          </a>
          {/* <a href="/">
            <img src={logo} alt="" style={{ height: "2rem" }} className="me-2" />
          </a>
          <a href="/" className="navbar-brand me-0 me-sm-3" style={{ verticalAlign: "middle" }}>
            Math Challenges
          </a> */}
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavbarNav className="me-auto mb-0 mb-lg-0">
            {Object.entries({
              Home: "/",
              About: "/about",
            }).map(([k, v]) => (
              <Link key="k" className={`nav-link${location.pathname === v ? " active" : ""}`} aria-current="page" to={v}>
                {k}
              </Link>
            ))}
          </NavbarNav>
          <div className="d-flex">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search Challenges"
                id="search"
                onChange={(e) => setSearchQuery(e.target.value.trimStart().replace(/[\s]{2,}/gi, " "))}
                value={searchQuery}
              />
              {/* <button type="button" className="btn btn-outline-success">
                <i className="fas fa-magnifying-glass" />
              </button> */}
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Nav;
