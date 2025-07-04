import React from 'react';
import { Team, Player, Country } from '../model/entities'; 

interface PlayerCardProps {
  teamOrPlayer: Team | Player; 
  type: 'team' | 'player'; 
}

export default function PlayerCard({ teamOrPlayer }: PlayerCardProps) {
  return (
    <div className="card">
      <h3>{teamOrPlayer.name}</h3>

      {teamOrPlayer.country && (
        <p>Country: {teamOrPlayer.country.name}</p>
      )}

      {'position' in teamOrPlayer && teamOrPlayer.position && ( 
        <p>Position: {teamOrPlayer.position}</p>
      )}
    </div>
  );
}