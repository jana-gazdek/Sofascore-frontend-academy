"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import Link from "next/link";
import EventCell from "../../../components/EventCell";
import { Player, Event } from "../../../model/entities";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile"; 
import EventWidget from "../../../components/EventWidget"; 
import { useTheme } from "../../../utils/ThemeProvider"; 

export default function PlayerPage() {
  const { playerId } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile(); 
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 

  const currentplayerId = Array.isArray(playerId) ? playerId[0] : playerId;
  const [imageError, setImageError] = React.useState(false)

  const [eventSpan, setEventSpan] = useState<'last' | 'next'>('last');
  const [eventPage, setEventPage] = useState(1);

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const playerUrl = currentplayerId ? `/api/player/${currentplayerId}` : null;
  const { data: player, error: playerError } = useSWR<Player>(
    playerUrl,
    fetcher
  );

  const eventsUrl = currentplayerId ? `/api/player/${currentplayerId}/events/${eventSpan}/${eventPage}` : null;
  const { data: events, error: eventsError } = useSWR<Event[]>(
    eventsUrl,
    fetcher
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  if (playerError || eventsError) {
    console.error("PlayerPage Error:", playerError || eventsError);
    return <div>Error loading player data.</div>;
  }

  if (!player || !events) return <div>Loading...</div>;

  const hasEvents = Array.isArray(events) && events.length > 0;
  
  const handleEventCardClick = (event: Event) => {
    if (isMobile) {
      router.push(`/event/${event.id}`);
    } else {
      setSelectedEvent(event);
    }
  };

  const handleWidgetClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{marginLeft: '10px'}}>
      <h1>{player.name}</h1>
      <p>Country: {player.country.name}</p>
      <p>Position: {player.position}</p>
      <img
        src={`/api/player/${currentplayerId}/image`}
        alt={`${player.name} Logo`}
        style={{ maxWidth: "150px" }}
        onError={handleImageError}
      />
      <p>
      <Link href="/">Back to Home</Link>
      </p>
      <h2>Events</h2>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => {
            setEventSpan('last');
            setEventPage(1);
          }}
          disabled={eventSpan === 'last'}
          style={{ marginRight: '10px' }}
        >
          Last Events
        </button>
        <button
          onClick={() => {
            setEventSpan('next');
            setEventPage(1);
          }}
          disabled={eventSpan === 'next'}
        >
          Next Events
        </button>
      </div>

      {hasEvents ? (
        <>
          <div className="card-grid">
            {events.map((event: Event) => (
              <EventCell
                key={event.id}
                event={event}
                onEventClick={handleEventCardClick} 
              />
            ))}
          </div>
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => setEventPage(prev => Math.max(1, prev - 1))}
              disabled={eventPage === 1}
              style={{ marginRight: '10px' }}
            >
              Previous Page
            </button>
            <span>Page {eventPage}</span>
            <button
              onClick={() => setEventPage(prev => prev + 1)}
              style={{ marginLeft: '10px' }}
            >
              Next Page
            </button>
          </div>
        </>
      ) : (
        <div>No {eventSpan} events found for this player.</div>
      )}
      {selectedEvent && (
        <>
          <div className="widget-overlay" onClick={handleWidgetClose}></div>
          <EventWidget event={selectedEvent} onClose={handleWidgetClose} isDarkMode={isDarkMode}/>
        </>
      )}
    </div>
  );
}