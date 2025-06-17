import React from 'react';
import { Team, Player } from '../model/entities'; 

interface TeamCardProps {
  teamOrPlayer: Team | Player;
  type: 'team' | 'player'; 
}

export default function TeamCard({ teamOrPlayer, type }: TeamCardProps) {
  return (
    <div className="card">
      <h3>{teamOrPlayer.name}</h3>

      {teamOrPlayer.country && (
        <p>
          {type === "team" ? "Country: " : "From: "}
          {teamOrPlayer.country.name}
        </p>
      )}
          {'position' in teamOrPlayer && (
            <p>Position: {teamOrPlayer.position}</p>
          )}
    </div>
  );
}