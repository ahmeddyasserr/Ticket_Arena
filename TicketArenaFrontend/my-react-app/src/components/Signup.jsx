import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [league, setLeague] = useState(""); 
  const [favoriteTeam, setFavoriteTeam] = useState(""); 
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const leagues = {
    "Premier League": ["Chelsea", "Manchester United", "Manchester City", "Tottenham", "Liverpool", "Arsenal"],
    "Ligue 1": ["Paris Saint-Germain"],
    "Bundesliga": ["Bayern Munich", "Borussia Dortmund", "Bayer Leverkusen"],
    "Serie A": ["Inter Milan", "AC Milan", "Napoli", "Juventus", "Roma","Como"],
    "La Liga": ["Barcelona", "Real Madrid", "Atletico Madrid"],
  };

  const signup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSuccess(false);
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
          league,
          favorite_team: favoriteTeam,
        }),
      });

      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error occurred during signup. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Network error occurred. Please try again later.");
      setIsSuccess(false);
      console.error("Error:", error);
    }
  };

  return (
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
      <Form.Group className="mb-3" controlId="formGroupLeague">
        <Form.Label>Select League</Form.Label>
        <Form.Control
          as="select"
          value={league}
          onChange={(e) => {
            setLeague(e.target.value);
            setFavoriteTeam(""); 
          }}
          required
        >
          <option value="">-- Choose a League --</option>
          {Object.keys(leagues).map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {league && (
        <Form.Group className="mb-3" controlId="formGroupFavoriteTeam">
          <Form.Label>Select Favorite Team</Form.Label>
          <Form.Control
            as="select"
            value={favoriteTeam}
            onChange={(e) => setFavoriteTeam(e.target.value)}
            required
          >
            <option value="">-- Choose a Team --</option>
            {leagues[league].map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      )}
      <Button variant="primary" type="submit">
        Sign up
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
  );
}

export default Signup;
