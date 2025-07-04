import React from 'react';
import { Tournament } from '../model/entities'; 

interface TournamentCellProps {
  tournament: Tournament; 
}

export default function TournamentCell({ tournament }: TournamentCellProps) {
  return (
    <div className="card">
      <h3>
        {tournament.name}
      </h3>
      <p>Sport: {tournament.sport.name}</p>
    </div>
  );
}