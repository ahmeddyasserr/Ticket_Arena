import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

function Shop() {
  const [items, setItems] = useState([]); // Shop items
  const [loading, setLoading] = useState(true); // Loading state
  const [user] = useState(JSON.parse(localStorage.getItem("user"))); // User from localStorage
  const [message, setMessage] = useState(null); // Message state for feedback

  const BASE_URL = "http://127.0.0.1:8000";

  // Fetch shop items
  useEffect(() => {
    async function fetchShopItems() {
      try {
        const response = await fetch(`${BASE_URL}/shop/`);
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop items:", error);
        setLoading(false);
      }
    }

    fetchShopItems();
  }, []);

  // Add to shop cart
  const addToShopCart = async (itemId) => {
    if (!user || !user.token) {
      setMessage("You must be logged in to add items to the shop cart.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/shop_cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user.token}`, // Use token from the user object
        },
        body: JSON.stringify({ item_id: itemId, quantity: 1 }), // Request body
      });

      if (response.ok) {
        setMessage("Item added to shop cart successfully!");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Unable to add to shop cart."}`);
      }

      // Clear the message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Network error adding to shop cart:", error);
      setMessage("An error occurred. Please try again.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Shop</h1>

      {/* Message Alert */}
      {message && (
        <Alert variant="info" className="text-center">
          {message}
        </Alert>
      )}

      {loading ? (
        <p className="text-center text-muted">Loading items...</p>
      ) : items.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {items.map((item) => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}${item.image}`}
                  alt={item.name}
                  style={{
                    maxHeight: "200px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Category: {item.category || "N/A"}</Card.Text>
                  <Card.Text>Price: ${parseFloat(item.price).toFixed(2)}</Card.Text>
                  <Card.Text>Stock: {item.stock}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => addToShopCart(item.id)}
                    disabled={item.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No items available.</p>
      )}
    </Container>
  );
}

export default Shop;
