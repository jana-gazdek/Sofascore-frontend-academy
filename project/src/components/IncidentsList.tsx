import React from 'react';
import { Incident } from '../model/entities'; 

interface IncidentsListProps {
  incidents: Incident[];
}

const incidentStyle: React.CSSProperties = {
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  borderBottom: '1px solid #eee',
};

const typeColors: { [key: string]: string } = {
  'goal': '#4CAF50',    
  'period': '#607D8B', 
  'card_yellow': '#FFD700',      
  'card_red': '#DC143C',         
  'card_yellowred': '#FF8C00',   
  'fallback': '#ccc'
};

export default function IncidentsList({ incidents }: IncidentsListProps) {
  const incidentsToDisplay = Array.isArray(incidents) ? incidents : [];

  if (incidentsToDisplay.length === 0) {
    return <p style={{ fontStyle: 'italic', color: '#999' }}>No incidents found for this event.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {incidentsToDisplay.map((inc) => (
        <li key={inc.id} style={incidentStyle}>
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            {inc.time}'
          </span>

          {inc.player && inc.player.name ? (
            <span style={{ marginRight: "10px" }}>{inc.player.name}</span>
          ) : inc.text ? (
            <span style={{ marginRight: "10px", fontStyle: 'italic' }}>
              {inc.text}
            </span>
          ) : (
            <span style={{ marginRight: "10px", color: '#aaa' }}>-</span>
          )}

          {inc.type === 'card' && inc.color ? (
            <span
              style={{
                backgroundColor: inc.color === 'yellow' ? typeColors.card_yellow :
                                 inc.color === 'red' ? typeColors.card_red :
                                 inc.color === 'yellowred' ? typeColors.card_yellowred :
                                 typeColors.fallback,
                color: 'white',
                padding: "2px 5px",
                borderRadius: "3px",
                textTransform: 'capitalize'
              }}
            >
              {inc.color === 'yellow' ? 'Yellow Card' :
               inc.color === 'red' ? 'Red Card' :
               inc.color === 'yellowred' ? 'Red Card' :
               'Card'}
            </span>
          ) : inc.type === 'goal' && inc.homeScore !== undefined && inc.awayScore !== undefined ? (
            <>
              <span
                style={{
                  backgroundColor: typeColors.goal,
                  color: 'white',
                  padding: "2px 5px",
                  borderRadius: "3px",
                  marginRight: "5px",
                  textTransform: 'capitalize'
                }}
              >
                {inc.type}
              </span>
              <span style={{ fontWeight: 'bold' }}>
                ({inc.homeScore}-{inc.awayScore})
              </span>
              {inc.scoringTeam && (
                <span style={{ marginLeft: "5px", fontSize: '0.9em', color: '#666' }}>
                  ({inc.scoringTeam === 'home' ? 'Home Team' : 'Away Team'})
                </span>
              )}
            </>
          ) : inc.type === 'period' && inc.text ? (
            <span
                style={{
                  backgroundColor: typeColors.period,
                  color: 'white',
                  padding: "2px 5px",
                  borderRadius: "3px",
                  textTransform: 'uppercase'
                }}
              >
                {inc.type} 
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#ccc',
                padding: "2px 5px",
                borderRadius: "3px",
                textTransform: 'capitalize'
              }}
            >
              {inc.type}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}