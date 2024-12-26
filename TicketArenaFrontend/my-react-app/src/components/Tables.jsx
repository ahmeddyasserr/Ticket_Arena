import React, { useState, useEffect } from "react";

// API keys
const API_KEY = "873e88d9711648454f6eeafb3d8fe5aa";
const API_HOST = "v3.football.api-sports.io";


function FootballStandings() {
  const [standings, setStandings] = useState([]);
  const [league, setLeague] = useState("39"); 
  const [season, setSeason] = useState("2022");

 
  const leagues = {
    "39": "Premier League",
    "140": "La Liga",
    "61": "Ligue 1",
    "78": "Bundesliga",
    "135": "Serie A",
  };
  const seasons = ["2020", "2021", "2022"];

  // Fetch Data
  const fetchStandings = () => {
    const url = `https://${API_HOST}/standings?league=${league}&season=${season}`;
    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const leagueStandings = data.response[0].league.standings[0];
        setStandings(leagueStandings);
      });
  };

 
  useEffect(() => {
    fetchStandings();
  }, [league, season]);

  return (
    <>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Football League Standings</h1>

      {/* Dropdown for League and Season */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select League:</label>
        <select value={league} onChange={(e) => setLeague(e.target.value)}>
          {Object.entries(leagues).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "20px", marginRight: "10px" }}>
          Select Season:
        </label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Standings Table */}
      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <thead style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Team</th>
            <th>Played</th>
            <th>Goals Diff</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id}>
              <td>{team.rank}</td>
              <td>
                <img
                  src={team.team.logo}
                  alt={`${team.team.name} logo`}
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </td>
              <td>{team.team.name}</td>
              <td>{team.all.played}</td>
              <td>{team.goalsDiff}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     {/* Footer */}
     <footer className="text-center my-2">
    Copyright &copy; 2024 - All rights reserved To Ticket Arena.
  </footer>
  </>
  );
}

export default FootballStandings;
