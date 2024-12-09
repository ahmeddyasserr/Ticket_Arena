import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import '../index.css'; // Make sure this imports the CSS for animations

const About = () => {
  return (
    <>
      {/* About Us Container */}
      <Container className="about-us-container border p-5 m-5 rounded-5 shadow">
        <h1>About Us</h1>
        <p>
          We are a dreamer team, passionate about making sports experiences
          better and more accessible for everyone. Ticket Arena is a startup that
          helps you watch your favorite team’s match by booking tickets in just a
          few clicks. Our goal is to provide a seamless and convenient way for
          fans to experience live sports by simplifying the ticket booking process.
        </p>
        <p>
          Whether you are looking for tickets to a local match or traveling to
          support your team, Ticket Arena is your trusted partner in making it
          happen. Join us in bringing fans closer to the action!
        </p>
      </Container>

      {/* Meet the Developers Container */}
      <Container className="meet-developers-container border p-5 m-5 rounded-5 shadow">
  <h2>Meet the Developers</h2>
  <Row>
    {/* Developer Cards */}
    {[
      { name: "Abdulkhaliq", role: "Backend Developer" },
      { name: "Ebaid", role: "Backend Developer" },
      { name: "Kareem", role: "Frontend Developer" },
      { name: "Saleh", role: "Frontend Developer" },
      { name: "Yasser", role: "Backend Developer" },
    ].map((developer, index) => (
      <Col md={4} key={index}>
        <Card className="developer-card mb-4 shadow-sm">
          <Card.Img
            variant="top"
            src={`public/imgs/${developer.name}.jpg`}
            alt={`Developer ${developer.name}`}
            className="developer-image"
          />
          <Card.Body>
            <Card.Title>{`Developer ${developer.name}`}</Card.Title>
            <Card.Text>{developer.role}</Card.Text>
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
export default About;
