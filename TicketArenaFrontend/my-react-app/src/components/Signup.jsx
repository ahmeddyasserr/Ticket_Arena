import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import HomeNav from "./HomeNav";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // To differentiate success and error messages
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSuccess(false); // Indicate error
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setIsSuccess(true); // Indicate success
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error occurred during signup. Please try again.");
        setIsSuccess(false); // Indicate error
      }
    } catch (error) {
      setMessage("Network error occurred. Please try again later.");
      setIsSuccess(false); // Indicate error
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HomeNav />
      <Form className="border p-5 m-5 rounded-5 shadow" onSubmit={signup}>
        <h1>Sign up:</h1>
        <hr />
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupRePassword">
          <Form.Label>Re-enter password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
        {message && (
          <p
            className="mt-3"
            style={{
              color: isSuccess ? "green" : "red", // Conditional styling for success or error
            }}
          >
            {message}
          </p>
        )}
      </Form>
    </>
  );
}

export default Signup;
