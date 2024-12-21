import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("user"))); // User from localStorage
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    async function fetchCartItems() {
      if (!user || !user.token) {
        alert("You must be logged in to view the cart.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/carts/`, {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        const data = await response.json();
        const combinedItems = [
          ...data.shop_cart.map((item) => ({
            ...item,
            type: "shop",
          })),
          ...data.ticket_cart.map((item) => ({
            ...item,
            type: "ticket",
          })),
        ];
        setCartItems(combinedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }

    fetchCartItems();
  }, [user]);

  const handleRemoveItem = async (itemId, type) => {
    const endpoint =
      type === "shop"
        ? `${BASE_URL}/shop_cart/remove/${itemId}/`
        : `${BASE_URL}/ticket_cart/remove/${itemId}/`;

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
        alert("Item removed from cart.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        parseFloat(
          item.type === "shop"
            ? item.shop_item.price * item.quantity
            : item.category.price * item.quantity
        ),
      0
    );
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.type === "shop" ? (
                      <>
                        <img
                          src={`${BASE_URL}${item.shop_item.image}`}
                          alt={item.shop_item.name}
                          className="img-fluid me-2"
                          style={{ maxHeight: "50px" }}
                        />
                        {item.shop_item.name}
                      </>
                    ) : (
                      <>
                        <img
                          src={`${BASE_URL}${item.category.match.team1_logo}`}
                          alt={item.category.match.team1}
                          className="img-fluid me-2"
                          style={{ maxHeight: "50px" }}
                        />
                        <img
                          src={`${BASE_URL}${item.category.match.team2_logo}`}
                          alt={item.category.match.team2}
                          className="img-fluid me-2"
                          style={{ maxHeight: "50px" }}
                        />
                        {item.category.match.team1} vs {item.category.match.team2}
                        <br />
                        <small>
                          {item.category.match.date} | {item.category.match.stadium}
                        </small>
                      </>
                    )}
                  </td>
                  <td>
                    {item.type === "shop"
                      ? item.shop_item.category || "N/A"
                      : item.category.name}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      defaultValue={item.quantity}
                      className="form-control"
                      style={{ maxWidth: "60px" }}
                    />
                  </td>
                  <td>
                    ${parseFloat(
                      item.type === "shop"
                        ? item.shop_item.price
                        : item.category.price
                    ).toFixed(2)}
                  </td>
                  <td>
                    ${(
                      parseFloat(
                        item.type === "shop"
                          ? item.shop_item.price
                          : item.category.price
                      ) * parseInt(item.quantity)
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id, item.type)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="text-end mt-4">
            Grand Total: ${calculateTotal().toFixed(2)}
          </h4>
        </>
      )}
    </div>
  );
};

export default Cart;
