import React from 'react';
import { Standing } from '../model/entities'; 

interface StandingsProps {
  standings: Standing[]; 
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  //marginTop: "10px"
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  background: "--color-primary"
};

export default function Standings({ standings }: StandingsProps) {
  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  const standing = standings[0]; 

  return (
    <div>
      <h3>{standing.tournament.name} - Standings</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>#</th>
            <th style={cellStyle}>Team</th>
            <th style={cellStyle}>Played</th>
            <th style={cellStyle}>Wins</th>
            <th style={cellStyle}>Draws</th>
            <th style={cellStyle}>Losses</th>
            <th style={cellStyle}>Points</th>
          </tr>
        </thead>
        <tbody>
          {standing.sortedStandingsRows.map((row, index) => (
            <tr key={row.id}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{row.team.name}</td>
              <td style={cellStyle}>{row.played}</td>
              <td style={cellStyle}>{row.wins}</td>
              <td style={cellStyle}>{row.draws}</td>
              <td style={cellStyle}>{row.losses}</td>
              <td style={cellStyle}>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}