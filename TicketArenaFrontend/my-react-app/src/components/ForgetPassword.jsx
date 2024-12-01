import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import HomeNav from "./HomeNav";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/reset_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Password reset successful!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error resetting password. Please try again.");
      }
    } catch (error) {
      setMessage("Network error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HomeNav />
      <Form className="border p-5 m-5 rounded-5 shadow" onSubmit={resetPassword}>
        <h1>Forget Password:</h1>
        <hr />
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
        {message && <p className="mt-3 text-danger">{message}</p>}
      </Form>
    </>
  );
}

export default ForgetPassword;
