import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarNav from "react-bootstrap/Nav";
import logo from "./../img/math-app.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDarkMode } from "contexts/useDarkMode";

function Nav({ searchQuery, setSearchQuery }) {
  const { pathname } = useRouter();

  const dm = useDarkMode();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <div className="container-lg">
        <div>
          <Link href="/" style={{ textDecoration: "none" }}>
            <img src={logo.src} alt="Logo" style={{ height: "2rem" }} className="me-2" width={32} height={32} />
            <span className="navbar-brand me-0 me-sm-3" style={{ verticalAlign: "middle" }}>
              Math Challenges
            </span>
          </Link>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavbarNav className="me-auto mb-0 mb-lg-0">
            {Object.entries({
              Home: "/",
              About: "/about",
              Levelmaker: "/levelmaker",
            }).map(([k, v]) => (
              <Link key={k} href={v} passHref legacyBehavior>
                <NavbarNav.Link active={v == pathname} aria-current="page">
                  {k}
                </NavbarNav.Link>
              </Link>
            ))}
          </NavbarNav>
          <div className="form-check form-switch text-danger" style={{ width: "max-content", margin: "auto" }}>
            <label className="form-check-label" htmlFor="darkModeSwitch" style={{ color: "var(--bs-light)" }}>
              Dark Mode<span className="badge bg-secondary ms-2">Beta</span>
            </label>
            <input className="form-check-input" type="checkbox" id="darkModeSwitch" checked={dm.darkModeEnabled} onChange={() => dm.toggleDarkMode()} />
          </div>
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
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Nav;
