import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert, Form } from "react-bootstrap";

function Shop() {
  const [items, setItems] = useState([]); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [user] = useState(JSON.parse(localStorage.getItem("user"))); 
  const [message, setMessage] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  const BASE_URL = "http://127.0.0.1:8000";

  
  useEffect(() => {
    async function fetchShopItems() {
      try {
        const response = await fetch(`${BASE_URL}/shop/`);
        const data = await response.json();
        setItems(data);
        setFilteredItems(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop items:", error);
        setLoading(false);
      }
    }

    fetchShopItems();
  }, []);

  
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
          Authorization: `Token ${user.token}`, 
        },
        body: JSON.stringify({ item_id: itemId, quantity: 1 }), 
      });

      if (response.ok) {
        setMessage("Item added to shop cart successfully!");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Unable to add to shop cart."}`);
      }

      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Network error adding to shop cart:", error);
      setMessage("An error occurred. Please try again.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterItems(query, selectedCategory);
  };

 
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterItems(searchQuery, category);
  };

 
  const filterItems = (query, category) => {
    let filtered = items;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (query) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
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

      {/* Search and Filter Options */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <p className="text-center text-muted">Loading items...</p>
      ) : filteredItems.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredItems.map((item) => (
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
