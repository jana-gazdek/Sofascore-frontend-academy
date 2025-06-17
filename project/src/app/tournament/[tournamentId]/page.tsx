"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import Link from "next/link";
import EventCell from "../../../components/EventCell";
import Standings from "../../../components/Standings";
import { Tournament, Event, Standing } from "../../../model/entities";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import EventWidget from "../../../components/EventWidget";
import { useTheme } from "../../../utils/ThemeProvider"; 

export default function TournamentPage() {
  const params = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 

  const tournamentId = Array.isArray(params.tournamentId)
    ? params.tournamentId[0]
    : params.tournamentId;

  const [eventSpan, setEventSpan] = useState<'last' | 'next'>('last');
  const [eventPage, setEventPage] = useState(1);

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const tournamentUrl = tournamentId ? `/api/tournament/${tournamentId}` : null;
  const eventsUrl = tournamentId ? `/api/tournament/${tournamentId}/events/${eventSpan}/${eventPage}` : null;
  const standingsUrl = tournamentId ? `/api/tournament/${tournamentId}/standings` : null;

  const { data: tournament, error: tournamentError } = useSWR<Tournament>(
    tournamentUrl,
    fetcher
  );

  const { data: events, error: eventsError } = useSWR<Event[]>(
    eventsUrl,
    fetcher
  );

  const { data: standings, error: standingsError } = useSWR<Standing[]>(
    standingsUrl,
    fetcher
  );

  if (tournamentError || eventsError || standingsError) {
    console.error("DEBUG - TournamentPage: One or more SWR hooks returned an error:");
    if (tournamentError) console.error("  Tournament Error:", tournamentError);
    if (eventsError) console.error("  Events Error:", eventsError);
    if (standingsError) console.error("  Standings Error:", standingsError);
    return <div>Error loading tournament data.</div>;
  }
  if (!tournament || !events || !standings)
    return <div>Loading...</div>;

  const hasEvents = Array.isArray(events) && events.length > 0;
  const hasStandings = Array.isArray(standings) && standings.length > 0;

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
    <div style={{ marginLeft: '10px', marginRight: '10px'}}>
      <h1>{tournament.name}</h1>
      <div>
        <p style={{ fontWeight: 'bold'}}>Sport: {tournament.sport.name}</p>
        <p style={{ fontWeight: 'bold'}}>Country: {tournament.country.name}</p>
        <Link href="/">Back to Home</Link>

        <h2>Events</h2>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => {
            setEventSpan('last');
            setEventPage(1);
          }}
          disabled={eventSpan === 'last'}
          style={{ marginRight: '10px'}}
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
          <div style={{ marginTop: '10px'}}>
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
        <div>No {eventSpan} events found for this tournament.</div>
      )}

      <h2>Standings</h2>
      {hasStandings ? (
        <Standings standings={standings} />
      ) : (
        <div>No standings found for this tournament.</div>
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