import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useState } from "react";


function HomeNav() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  function logout() {
    const token = user.token;

    if (!token) {
      console.error("No token found!");
      return;
    }

    fetch("http://127.0.0.1:8000/logout/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Include the token in the header
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the token from localStorage and update state on success
          localStorage.removeItem("user");
          setUser(null);
        } else {
          // Handle errors
          return response.json().then((data) => {
            console.error("Error:", data);
          });
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none">
            <img
              src="./logo.png"
              width="80"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Link>
              <Link to="/" className="text-decoration-none">
                Home
              </Link>
            </Nav.Link>
            {/* Tables Button */}
            <Nav.Link>
              <Link to="/tables" className="text-decoration-none">
                Tables
              </Link>
            </Nav.Link>
            {/* Shop Button */}
            <Nav.Link>
              <Link to="/shop" className="text-decoration-none">
                Shop
              </Link>
            </Nav.Link>
            {/* About Us Link */}
            <Nav.Link>
              <Link to="/about" className="text-decoration-none">
                About Us
              </Link>
            </Nav.Link>
            {/* Contact Us Link */}
            <Nav.Link>
              <Link to="/contact" className="text-decoration-none">
                Contact Us
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/News" className="text-decoration-none">
                News
              </Link>
            </Nav.Link>
            {/* User Dropdown */}
            <NavDropdown
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              }
              id="collapsible-nav-dropdown"
            >
              {user ? (
                <>
                  <Link to="/profile" className="text-decoration-none text-black d-block">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </Link>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <Link to="/" className="text-decoration-none text-black">
                      Log Out
                    </Link>
                  </NavDropdown.Item>
                </>)
                : (
                  <>
                      <NavDropdown.Item>
                    <Link to="/login" className="text-decoration-none text-secondary d-block">
                        Login
                    </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                    <Link to="/sign-up" className=" text-decoration-none text-secondary d-block">
                        Sign Up
                    </Link>
                      </NavDropdown.Item>
                  </>
                )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNav;
