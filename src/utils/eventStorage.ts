
// Event type definition
export interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  address?: string;
  tag?: string;
  tagColor?: string;
  description?: string;
  hosts?: { id: number; name: string; avatar: string }[];
  attendees?: number;
  status: "upcoming" | "past";
}

// Get the next available ID
const getNextId = (events: Event[]): number => {
  if (events.length === 0) return 1;
  return Math.max(...events.map(event => event.id)) + 1;
};

// Load events from localStorage
export const getEvents = (): Event[] => {
  const eventsJson = localStorage.getItem('events');
  if (!eventsJson) return [];
  
  // Parse the JSON and convert string dates back to Date objects
  const events = JSON.parse(eventsJson);
  return events.map((event: any) => ({
    ...event,
    date: new Date(event.date)
  }));
};

// Save an event to localStorage
export const saveEvent = (event: Omit<Event, 'id' | 'status'>): Event => {
  const events = getEvents();
  const newEvent: Event = {
    ...event,
    id: getNextId(events),
    status: "upcoming",
    attendees: 0 // Initialize with 0 attendees
  };
  
  localStorage.setItem('events', JSON.stringify([...events, newEvent]));
  return newEvent;
};
