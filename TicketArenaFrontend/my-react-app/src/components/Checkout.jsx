import React from "react";

const Checkout = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout Page</h1>
      <p>Your items have been added to the cart.</p>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => alert("Checkout button clicked!")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Checkout;
