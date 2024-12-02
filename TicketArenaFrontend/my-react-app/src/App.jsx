

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch live matches
  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const response = await fetch("https://www.sofascore.com/api/v1/sport/football/events/live");
        const data = await response.json();
        setLiveMatches(data.events || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching live matches:", error);
        setLoading(false);
      }
    };
    fetchLiveMatches();
  }, []);

  const handleDetails = (match) => {
    setSelectedMatch(match);
    setShowModal(true);
  };

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

      {/* Live Matches Title */}
      <h2 className="text-center my-4">Live Matches</h2>

      {/* Today's Games Section */}
      <div id="todayGames">
        {loading ? (
          // Placeholder Content
          [...Array(3)].map((_, index) => (
            <div key={index} className="border p-2 m-2 my-4 text-center">
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button xs={5} aria-hidden="true" />
            </div>
          ))
        ) : liveMatches.length > 0 ? (
          // Live Matches
          liveMatches.map((match) => (
            <Card className="p-2 m-2 my-4 text-center" key={match.id}>
              <Card.Body>
                <Card.Title>
                  {match.homeTeam.name} VS {match.awayTeam.name}
                </Card.Title>
                <Card.Text>
                  Score: {match.homeScore.current} - {match.awayScore.current}
                </Card.Text>
                <Button variant="primary" onClick={() => handleDetails(match)}>
                  Details
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                {new Date(match.startTimestamp * 1000).toLocaleString()}
              </Card.Footer>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted">No live matches available.</p>
        )}
      </div>

      {/* Match Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Match Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMatch && (
            <>
              <h5>
                {selectedMatch.homeTeam.name} VS {selectedMatch.awayTeam.name}
              </h5>
              <p>
                Score: {selectedMatch.homeScore.current} - {selectedMatch.awayScore.current}
              </p>
              <p>Start Time: {new Date(selectedMatch.startTimestamp * 1000).toLocaleString()}</p>
              <p>Venue: {selectedMatch.venue?.name || "N/A"}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="text-center my-2">
        Copyright &copy; 2024 - All rights reserved.
      </footer>
    </>
  );
}

export default App;

