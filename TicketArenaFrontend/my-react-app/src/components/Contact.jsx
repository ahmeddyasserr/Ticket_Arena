import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import '../index.css'; 

const Contact = () => {
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [submittedName, setSubmittedName] = useState(""); 
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setSubmittedName(formValues.name);

    
    setShowConfirmation(true);

    
    setFormValues({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => setShowConfirmation(false), 5000);
  };

  return (
    <>
    <Container className="contact-container p-5 mt-5 shadow-sm rounded-4">
      <h1 className="text-center mb-4">Contact Us</h1>
      <p className="text-center mb-4">
        Feel free to reach out to us via email, phone, or by using the contact form below. We're here to help!
      </p>

      {showConfirmation && (
        <Alert variant="success" className="text-center">
          Thank you <strong>{submittedName}</strong>, your comment has been delivered. Thank you for the support!
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <h3>Get in Touch</h3>
          <ul className="contact-info">
            <li><strong>Email:</strong> ticketarena001@gmail.com</li>
            <li><strong>Phone:</strong> +201200624409</li>
          </ul>
        </Col>

        <Col md={6}>
          <h3>Contact Form</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={formValues.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    {/* Footer */}
    <footer className="text-center my-2">
    Copyright &copy; 2024 - All rights reserved To Ticket Arena.
  </footer>
  </>
  );
};

export default Contact;


