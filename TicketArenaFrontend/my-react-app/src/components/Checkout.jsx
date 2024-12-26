import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Alert, Image, Card, Button } from "react-bootstrap";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const confirmationNumber = location.state?.confirmationNumber;

  const handleDoneClick = () => {
    const button = document.getElementById("done-button");
    button.classList.add("animate-button");
    setTimeout(() => {
      button.classList.remove("animate-button");
      navigate("/");
    }, 500); 
  };

  return (
    <Container className="my-5">
     
      <Row>
        <Col className="mb-4">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Checkout</h2>
        </Col>
      </Row>

    
      <Row className="text-center mb-4">
        <Col>
          <Alert variant="success" className="py-4">
            <h4 style={{ fontWeight: "bold" }}>Order Confirmation Number:</h4>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#198754",
              }}
            >
              {confirmationNumber}
            </p>
          </Alert>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mb-4">
          <h2 className="mb-0" style={{ fontSize: "1.8rem", fontWeight: "600" }}>
            Payment Methods
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col xs={6} sm={3} md={2} className="mb-3">
          <Image
            src="/imgs/vodafone_wider.png"
            alt="Vodafone Cash"
            fluid
            className="rounded"
          />
        </Col>
        <Col xs={6} sm={3} md={2} className="mb-3">
          <Image
            src="/imgs/meza_wider.png"
            alt="Meza"
            fluid
            className="rounded"
          />
        </Col>
        <Col xs={6} sm={3} md={2} className="mb-3">
          <Image
            src="/imgs/meza (2).png"
            alt="Orange Cash"
            fluid
            className="rounded"
          />
        </Col>
        <Col xs={6} sm={3} md={2} className="mb-3">
          <Image
            src="/imgs/meza (4).png"
            alt="InstaPay"
            fluid
            className="rounded"
          />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="p-4" style={{ backgroundColor: "#f9f9f9", boxShadow: "none" }}>
            <Card.Body>
              <h5 className="mb-3" style={{ fontWeight: "bold" }}>
                Payment Instructions
              </h5>
              <p className="mb-0">
                Please send the transaction ID to the following number:{" "}
                <span style={{ color: "#dc3545", fontWeight: "bold" }}>
                  01095579586
                </span>
                .
              </p>
              <p>
                Don’t forget to include your order confirmation number for
                verification.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
      <Row className="mt-5 text-center">
        <Col>
          <Button
            id="done-button"
            onClick={handleDoneClick}
            style={{
              backgroundColor: "#198754",
              border: "none",
              padding: "12px 30px",
              fontSize: "1.2rem",
              fontWeight: "600",
              borderRadius: "50px",
            }}
          >
            Done
          </Button>
        </Col>
      </Row>

  
      <style>
        {`
          .animate-button {
            animation: pulse 0.5s ease-in-out;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Checkout;
