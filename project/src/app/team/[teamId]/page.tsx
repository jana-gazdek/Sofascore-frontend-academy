"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import Link from "next/link";
import TeamCard from "../../../components/TeamCard";
import EventCell from "../../../components/EventCell";
import { Team, Player, Event } from "../../../model/entities";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile"; 
import EventWidget from "../../../components/EventWidget"; 
import { useTheme } from "../../../utils/ThemeProvider"; 

export default function TeamPage() {
  const { teamId } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const currentTeamId = Array.isArray(teamId) ? teamId[0] : teamId;

  const [eventSpan, setEventSpan] = useState<'last' | 'next'>('last');
  const [eventPage, setEventPage] = useState(1);

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';  

  const teamUrl = currentTeamId ? `/api/team/${currentTeamId}` : null;
  const { data: team, error: teamError } = useSWR<Team>(
    teamUrl,
    fetcher
  );

  const playersUrl = currentTeamId ? `/api/team/${currentTeamId}/players` : null;
  const { data: players, error: playersError } = useSWR<Player[]>(
    playersUrl,
    fetcher
  );

  const eventsUrl = currentTeamId ? `/api/team/${currentTeamId}/events/${eventSpan}/${eventPage}` : null;
  const { data: events, error: eventsError } = useSWR<Event[]>(
    eventsUrl,
    fetcher
  );

  useEffect(() => {
    console.log("DEBUG - TeamPage URLs:");
    console.log("  Team URL:", teamUrl);
    console.log("  Players URL:", playersUrl);
    console.log("  Events URL:", eventsUrl);
  }, [teamUrl, playersUrl, eventsUrl]);

  useEffect(() => {
    console.log("DEBUG - TeamPage SWR Data/Errors:");
    console.log("  team data:", team);
    console.log("  teamError:", teamError);
    console.log("  players data:", players);
    console.log("  playersError:", playersError);
    console.log("  events data:", events);
    console.log("  eventsError:", eventsError);
  }, [team, teamError, players, playersError, events, eventsError]);

  if (teamError || playersError || eventsError) {
    console.error("TeamPage Error:", teamError || playersError || eventsError);
    return <div>Error loading team data.</div>;
  }
  if (!team || !players || !events) return <div>Loading...</div>;

  const hasPlayers = Array.isArray(players) && players.length > 0;
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
      <h1>{team.name}</h1>
      <p>Country: {team.country.name}</p>
      {team.managerName && <p>Manager: {team.managerName}</p>}
      {team.venue && <p>Venue: {team.venue}</p>}
      <img
        src={`/api/team/${currentTeamId}/image`}
        alt={`${team.name} Logo`}
        style={{ maxWidth: "150px" }}
      />
      <p><Link href="/">Back to Home</Link></p>


      <h2>Players</h2>
      {hasPlayers ? (
        <ul>
          {players.map((player: Player) => (
            <li key={player.id}>
              <Link href={`/player/${player.id}`}>
                <TeamCard teamOrPlayer={player} type="player" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No players found for this team.</div>
      )}

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
        <div>No {eventSpan} events found for this team.</div>
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