import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Highlights = () => {
  // Video Data
  const videos = [
    {
      title: "Manchester City vs Feynord",
      url: "https://www.youtube.com/embed/M6-95-6ZXxM",
    },
    {
      title: "Barcelona vs Brest",
      url: "https://www.youtube.com/embed/nZXAljX7OsE",
    },
    {
      title: "Liverpool vs Southampton",
      url: "https://www.youtube.com/embed/iC9Y48ABSik",
    },
    {
      title: "Atletico vs Las Palmas",
      url: "https://www.youtube.com/embed/c_cdItiz34E",
    },
    {
      title: "Marseille vs Nantes",
      url: "https://www.youtube.com/embed/T1_zOzSI_R8",
    },
    {
      title: "Bayern vs Hoffenheim",
      url: "https://www.youtube.com/embed/CinzOF5WxJA",
    },
    {
      title: "Chelsea vs Leicester",
      url: "https://www.youtube.com/embed/ZgfctZZyvLs",
    },
    {
      title: "PSG vs Bayern",
      url: "https://www.youtube.com/embed/LkGR7wwek9I",
    },
    {
      title: "Real Madrid vs Season",
      url: "https://www.youtube.com/embed/vbHoyHdUUe4",
    },
  ];

  return (
    <>
    <Container className="my-5">
      <h1 className="text-center mb-4">Match Highlights</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {videos.map((video, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">{video.title}</Card.Title>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={video.url}
                    title={video.title}
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
    </Container>
     {/* Footer */}
     <footer className="text-center my-2">
     Copyright &copy; 2024 - All rights reserved To Ticket Arena.
   </footer>
   </>
  );
};

export default Highlights;
