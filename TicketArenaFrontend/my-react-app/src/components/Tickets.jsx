import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Tickets = () => {
  const location = useLocation();
  const { match, categories } = location.state || {};

  const [message, setMessage] = useState(null); 
  const [user] = useState(JSON.parse(localStorage.getItem("user"))); 

  const BASE_URL = "http://127.0.0.1:8000"; 

  if (!match) {
    return <p className="text-danger text-center">Match not found.</p>;
  }

  const handleBookTicket = async (categoryId, quantity) => {
    if (!user || !user.token) {
      alert("You must be logged in to book tickets.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/ticket_cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user.token}`, 
        },
        body: JSON.stringify({ item_id: categoryId, quantity: quantity }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Tickets added to cart successfully!");
      } else {
        setMessage(data.error || "Failed to add tickets to cart.");
      }

      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error booking ticket:", error);
      setMessage("An error occurred. Please try again.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        {match.team1} VS {match.team2}
      </h2>

      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}

      <div className="d-flex align-items-start justify-content-between mb-4">
       
        <div className="text-center flex-grow-1">
          <img
            src={`${BASE_URL}${match.team1_logo}`}
            alt={match.team1}
            className="img-fluid me-3"
            style={{ maxHeight: "100px" }}
          />
          <img
            src={`${BASE_URL}${match.team2_logo}`}
            alt={match.team2}
            className="img-fluid"
            style={{ maxHeight: "100px" }}
          />
          <p className="mt-3">
            <strong>Stadium:</strong> {match.stadium} | <strong>Date:</strong>{" "}
            {match.date} | <strong>League:</strong> {match.league}
          </p>
        </div>

       
        <div className="flex-shrink-0 text-center ms-4">
          <img
            src="/imgs/stadium.png" 
            alt="Stadium Layout"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "300px",
              width: "100%",
              objectFit: "contain",
            }}
          />
          <p className="mt-2">
            <strong>{match.stadium}</strong>
          </p>
        </div>
      </div>

     
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>Category</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.price}</td>
                  <td>
                    <select
                      id={`quantity-${category.id}`}
                      className="form-select form-select-sm"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option value={num + 1} key={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const quantity = document.getElementById(
                          `quantity-${category.id}`
                        ).value;
                        handleBookTicket(category.id, quantity);
                      }}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
