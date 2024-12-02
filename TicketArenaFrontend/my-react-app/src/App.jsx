import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import { Link } from "react-router-dom";

function App() {
  const loading = true;

  return (
    <>
      {/* Main Section */}
      <section className="main-section">
        <h1 className="display-2 text-center text-white position-absolute top-50 start-50 translate-middle w-100">
          Get in the game with ease!
        </h1>
      </section>

      {/* Get Started Button */}
      <Link to="/highlights" style={{ textDecoration: "none" }}>
        <Button
          variant="outline-secondary"
          size="lg"
          className="d-flex mx-auto my-4 rounded-pill"
          type="button"
        >
          GET STARTED
        </Button>
      </Link>

      {/* Today's Games Section */}
      <div id="todayGames">
        {loading ? (
          <>
            {/* Placeholder Content */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="border p-2 m-2 my-4 text-center"
              >
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button xs={5} aria-hidden="true" />
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Game Cards */}
            {[...Array(3)].map((_, index) => (
              <Card className="p-2 m-2 my-4 text-center" key={index}>
                <Card.Body>
                  <Card.Title>Alahly VS Zamalek</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Book for $20</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Monday - 07:00PM
                </Card.Footer>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center my-2">
        Copyright &copy; 2024 - All rights reserved.
      </footer>
    </>
  );
}

export default App;

