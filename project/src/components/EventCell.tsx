"use client"; 

import React from 'react';
import { Event } from '../model/entities'; 
import { formatEventDateTime } from '@/utils/dateFormatter';


interface EventCellProps {
  event: Event;
  onEventClick: (event: Event) => void;
}

export default function EventCell({ event, onEventClick }: EventCellProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const eventStartDate = new Date(event.startDate); 
  const now = new Date();  

  const showScore = eventStartDate <= now; //event.status !== 'notstarted' && event.status !== 'canceled' && event.status !== 'postponed';

  let scoreBackgroundColorVar = 'var(--color-secondary)'; 
  let scoreTextColor = 'white'; 

  if (showScore) {
    if (event.homeScore.total > event.awayScore.total) {
      scoreBackgroundColorVar = 'var(--color-success)'; 
    } else if (event.homeScore.total < event.awayScore.total) {
      scoreBackgroundColorVar = 'var(--color-danger)'; 
    } else {
      scoreBackgroundColorVar = 'var(--color-warning)'; 
      scoreTextColor = 'var(--text-primary)'; 
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'notstarted': return 'Not Started';
      case 'finished': return 'Finished';
      case 'inprogress': return 'Live';
      case 'canceled': return 'Canceled';
      case 'postponed': return 'Postponed';
      default: return status.toUpperCase();
    }
  };

  return (
    <div
      className="card"
      onClick={() => onEventClick(event)}
      style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'start', cursor: 'pointer' }}
    >
      <div>
        <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginBottom: '5px' }}>
          {event.tournament.name}
        </p>
        <p style={{ fontWeight: 'bold', fontSize: '1.1em', color: 'var(--text-primary)', marginBottom: '5px' }}>
          {event.homeTeam.name} - {event.awayTeam.name}
        </p>
        <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', margin: 0 }}>
          {formatEventDateTime(event.startDate)}
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        {showScore && (
          <p
            style={{
              backgroundColor: scoreBackgroundColorVar,
              padding: "5px 10px",
              borderRadius: "4px",
              color: scoreTextColor,
              display: 'inline-block', 
              marginBottom: '8px'
            }}
          >
            {event.homeScore.total} - {event.awayScore.total}
          </p>
        )}
        {showScore && (
        <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', margin: 0 }}>
          {getStatusDisplay(event.status)}
        </p>
        )}
      </div>
    </div>
  );
}