"use client";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "../utils/fetcher";
import EventCell from "../components/EventCell";
import TournamentCell from "../components/TournamentCell"; 
import { Sport, Tournament, Event } from "../model/entities"; 
import { formatDisplayDate } from "@/utils/dateFormatter";
import { useRouter } from 'next/navigation';
import { useIsMobile } from "@/hooks/useIsMobile";
import EventWidget from "@/components/EventWidget";
import { useTheme } from "../utils/ThemeProvider"; 

export default function HomePage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState("football");
  const today = new Date().toISOString().substring(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  const { theme } = useTheme(); 
  const isDarkMode = theme === 'dark';

  const { data: sports, error: sportsError } = useSWR<Sport[]>(
    "/api/sports",
    fetcher
  );

  const { data: tournaments, error: tournamentsError } = useSWR<Tournament[]>(
    selectedSport ? `/api/sport/${selectedSport}/tournaments` : null, 
    fetcher
  );

  const { data: events, error: eventsError } = useSWR<Event[]>(
    selectedSport && selectedDate ? `/api/sport/${selectedSport}/events/${selectedDate}` : null, 
    fetcher
  );

  if (sportsError || tournamentsError || eventsError)
    return <div style={{ textAlign: 'center', padding: '50px' }}>Error loading data.</div>;
  if (!sports || !tournaments || !events) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

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
    <div className="page-container"> 
      <h1>Sofa za sirotinju</h1>
      
      <div className="controls-container">
        <div className="control-group">
          <label htmlFor="sport-select">Choose Sport:</label>
          <select
            id="sport-select"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            {Array.isArray(sports) && sports.map((sport: Sport) => ( 
              <option key={sport.slug} value={sport.slug}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="date-select">Select Date:</label>
          <input
            id="date-select"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <h2 className="section-title">Tournaments</h2>
      {Array.isArray(tournaments) && tournaments.length > 0 ? (
        <div className="card-grid">
          {tournaments.map((tourn: Tournament) => ( 
            <Link href={`/tournament/${tourn.id}`} key={tourn.id}>
              <TournamentCell tournament={tourn} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No tournaments found for {selectedSport}.</p>
      )}
      {selectedDate && ( 
        <>
          <h2 className="section-title">
            Events for {selectedSport.toString().split('-').join(' ')} on {formatDisplayDate(selectedDate)}
          </h2>
          {Array.isArray(events) && events.length > 0 ? (
            <div className="card-grid">
              {events.map((event: Event) => (
                <EventCell key={event.id} event={event} onEventClick={handleEventCardClick} />
              ))}
            </div>
          ) : (
            <p>No events found for {selectedDate}. Please select another date.</p>
          )}
        </>
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
