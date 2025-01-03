import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import HomeNav from "./HomeNav";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); 
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Login successful! Redirecting...");
        setIsSuccess(true); 
        localStorage.setItem("user",JSON.stringify(data));
        
        setTimeout(() => {
          navigate("/"); 
          window.location.reload(); 
        }, 2000);

      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Invalid credentials.");
        setIsSuccess(false); 
      }
    } catch (error) {
      setMessage("Network error occurred.");
      setIsSuccess(false); 
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* <HomeNav /> */}
      <Form className="border p-5 m-5 rounded-5 shadow" onSubmit={login}>
        <h1>Login:</h1>
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
        <Link to="/forget-password" className="d-block text-decoration-none mb-3">Did you forget your password?</Link>

        <Button variant="primary" type="submit">
          Login
        </Button>
        {message && (
          <p
            className="mt-3"
            style={{
              color: isSuccess ? "green" : "red", 
            }}
          >
            {message}
          </p>
        )}
      </Form>
    </>
  );
}

export default Login;

