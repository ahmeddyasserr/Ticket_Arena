import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch highlight data from the API
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/highlights/");
        const data = await response.json();
        setHighlights(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching highlights:", error);
        setLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center mb-4">Match Highlights</h1>
        {loading ? (
          <p className="text-center text-muted">Loading highlights...</p>
        ) : highlights.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {highlights.map((highlight, index) => (
              <Col key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-center">
                      {highlight.match_name}
                    </Card.Title>
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={highlight.video_url}
                        title={highlight.match_name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center text-muted">No highlights available.</p>
        )}
      </Container>
      {/* Footer */}
      <footer className="text-center my-2">
        Copyright &copy; 2024 - All rights reserved To Ticket Arena.
      </footer>
    </>
  );
};

export default Highlights;
