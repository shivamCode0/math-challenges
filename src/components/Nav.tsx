import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarNav from "react-bootstrap/Nav";
import logo from "./../img/math-app.png";
import Link from "next/link";
import { useRouter } from "next/router";

function Nav({ searchQuery, setSearchQuery }) {
  const { pathname } = useRouter();

  return (
    <Navbar bg="primary" expand="sm" variant="dark">
      <div className="container-md">
        <div>
          <Link href="/">
            <a style={{ textDecoration: "none" }}>
              <img src={logo.src} alt="" style={{ height: "2rem" }} className="me-2" />
              <span className="navbar-brand me-0 me-sm-3" style={{ verticalAlign: "middle" }}>
                Math Challenges
              </span>
            </a>
          </Link>
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
              <Link key={k} href={v} passHref>
                <NavbarNav.Link active={v == pathname} aria-current="page">
                  {k}
                </NavbarNav.Link>
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
