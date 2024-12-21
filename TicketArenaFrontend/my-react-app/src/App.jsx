import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch matches data from the API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/matches/");
        const data = await response.json();
        setMatches(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleViewTickets = async (matchId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/matches/${matchId}/categories/`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();

      // Navigate to the Tickets page with fetched data
      navigate(`/tickets/${matchId}`, { state: { match: data.match, categories: data.categories } });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      {/* Main Section */}
      <section className="main-section">
        <h1 className="display-2 text-center text-white position-absolute top-50 start-50 translate-middle w-100">
          Get in the game with ease!
        </h1>
      </section>

      {/* GET STARTED Button */}
      <Container className="text-center my-4">
        <Link to="/highlights" style={{ textDecoration: "none" }}>
          <Button variant="outline-secondary" size="lg" className="rounded-pill">
            GET STARTED
          </Button>
        </Link>
      </Container>

      <Container>
        <h2 className="text-center my-4">Upcoming Matches</h2>
        {loading ? (
          <p className="text-center text-muted">Loading matches...</p>
        ) : matches.length > 0 ? (
          <Row className="gy-3">
            {matches.map((match) => (
              <Col key={match.id} md={12}>
                <Card className="shadow-sm p-3">
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      <img
                        src={`http://127.0.0.1:8000${match.team1_logo}`}
                        alt={match.team1}
                        className="img-fluid"
                        style={{
                          maxWidth: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                      <h6 className="mt-2">{match.team1}</h6>
                    </Col>
                    <Col xs={6} className="text-center">
                      <p className="fw-bold mb-1">
                        <span className="fs-5">{match.team1}</span> VS{" "}
                        <span className="fs-5">{match.team2}</span>
                      </p>
                      <p className="text-muted mb-1">
                        <strong>Stadium:</strong> {match.stadium}
                      </p>
                      <p className="text-muted mb-1">
                        <strong>Date:</strong> {match.date}
                      </p>
                      <p className="text-muted">
                        <strong>Time:</strong> {match.time}
                      </p>
                    </Col>
                    <Col xs={3} className="text-center">
                      <img
                        src={`http://127.0.0.1:8000${match.team2_logo}`}
                        alt={match.team2}
                        className="img-fluid"
                        style={{
                          maxWidth: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                      <h6 className="mt-2">{match.team2}</h6>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col className="text-center">
                      <p className="text-muted mb-0">
                        <strong>League:</strong> {match.league}
                      </p>
                      <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => handleViewTickets(match.id)}
                      >
                        View Tickets
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center text-muted">No matches available.</p>
        )}
      </Container>

      <footer className="text-center py-3">
        Copyright &copy; 2024 - All rights reserved.
      </footer>
    </>
  );
}

export default App;
