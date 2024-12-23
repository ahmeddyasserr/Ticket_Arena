import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const confirmationNumber = location.state?.confirmationNumber;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Checkout Page</h1>
            {confirmationNumber ? (
                <div>
                    <p>Your order has been placed successfully.</p>
                    <h3>Order Confirmation Number: {confirmationNumber}</h3>
                </div>
            ) : (
                <p>There was an issue with your order. Please try again.</p>
            )}
        </div>
    );
};

export default Checkout;
