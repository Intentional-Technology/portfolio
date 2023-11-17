import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./Menu.module.css";

function Menu() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className={styles.navbar + " ps-3 pe-3"}>
        <Navbar.Brand href="/#top">
          <img src="/images/logo/logo_side.svg" alt="Intentional Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className={styles.navLink}
              href="/#top"
              onClick={(e) => {
                if (window.location.pathname == "/") {
                  e.preventDefault();
                }
                scrollToSection("mission");
              }}
            >
              Mission
            </Nav.Link>
            <Nav.Link
              className={styles.navLink}
              href="/#apps"
              onClick={(e) => {
                if (window.location.pathname == "/") {
                  e.preventDefault();
                }
                scrollToSection("apps");
              }}
            >
              Apps
            </Nav.Link>
            <Nav.Link
              className={styles.navLink}
              href="/#about"
              onClick={(e) => {
                if (window.location.pathname == "/") {
                  e.preventDefault();
                }
                scrollToSection("about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/contact">
              Contact
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/blog">
              Blog
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Menu;
