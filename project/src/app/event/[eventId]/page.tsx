"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import Link from "next/link";
import IncidentsList from "../../../components/IncidentsList";
import { Event, IncidentsResponse, Incident } from "../../../model/entities"; 
import { formatEventDateTime } from "@/utils/dateFormatter";

export default function EventPage() {
  const { eventId } = useParams();

  const currentEventId = Array.isArray(eventId) ? eventId[0] : eventId;

  const { data: eventData, error: eventError } = useSWR<Event>(
    currentEventId ? `/api/event/${currentEventId}` : null,
    fetcher
  );

  const { data: incidentsData, error: incidentsError } = useSWR<Incident[]>(
    currentEventId ? `/api/event/${currentEventId}/incidents` : null,
    fetcher
  );

  if (eventError) return <div>Error loading event data.</div>;
  if (incidentsError) return <div>Error loading incidents data.</div>;
  if (!eventData || !incidentsData) return <div>Loading...</div>;

  var incidentsToDisplay = incidentsData || []; 

  const eventStartDate = new Date(eventData.startDate); 
  const now = new Date();  

  const showScore = eventStartDate <= now;

  if (!showScore) {
    incidentsToDisplay = []
  }

  return (
    <div style={{marginLeft: '10px'}}>
      <h1>Event Details</h1>
      <Link href="/">Back to Home</Link>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          margin: "10px 0"
        }}
      >
        <h2>
          {eventData.homeTeam.name} vs {eventData.awayTeam.name}
        </h2>
        <p>
          Start Date:{" "}
          {formatEventDateTime(new Date(eventData.startDate).toLocaleString())}
        </p>
        {showScore && (
          <>
        <p>Status: {eventData.status}</p>
        <div>
          <h3>Score</h3>
          <p>
            {eventData.homeScore?.total} -{" "}
            {eventData.awayScore?.total}
          </p>
        </div>
        </>
        )}
      </div>
      <div>
        <h2>Incidents</h2>
        <IncidentsList incidents={incidentsToDisplay} />
      </div>
    </div>
  );
}