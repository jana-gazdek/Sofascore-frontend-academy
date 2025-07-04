"use client"; 
import Link from 'next/link';
import { Event } from '../model/entities';
import { formatDisplayDate } from '@/utils/dateFormatter';

interface EventWidgetProps {
  event: Event | null;
  onClose: () => void;
  isDarkMode: boolean;
}

function EventWidget({ event, onClose, isDarkMode }: EventWidgetProps) {
  if (!event) {
    return null;
  }

 const widgetClass = `event-widget ${isDarkMode ? 'dark-mode' : 'light-mode'}`;

  return (
    <div className={widgetClass}>
      <button className="event-widget-close-btn" onClick={onClose}>X</button>

      <h4>Details</h4> 
      <p>Tournament: {event.tournament.name}</p> 
      <p>Sport: {event.tournament.sport.name}</p> 
      <p>Country: {event.tournament.country.name}</p> 
      <p>Date: {formatDisplayDate(new Date(event.startDate).toLocaleDateString())}</p>
      <p>Time: {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

      <Link href={`/event/${event.id}`} className="btn-primary event-widget-link">
        Go to event page
      </Link>
    </div>
  );
}

export default EventWidget;