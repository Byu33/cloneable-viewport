
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Search, Bell, Filter } from "lucide-react";
import TabBar from "@/components/TabBar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CheckInDialog from "@/components/CheckInDialog";
import { getEvents } from "@/utils/eventStorage";
import YourEventCard from "@/components/YourEventCard";
import EventFilterSheet from "@/components/EventFilterSheet";
import { EventFilters } from "@/components/EventFilterSheet";

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  tag?: string;
  tagColor?: string;
  attendees?: number;
  status: "upcoming" | "past";
}

const YourEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Your Events");
  const tabs = ["Going", "Explore", "Your Events"];
  const [checkInEvent, setCheckInEvent] = useState<any>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<EventFilters>({
    eventTypes: [],
    tags: [],
    attendeeStatus: [],
    startDate: undefined,
    endDate: undefined
  });

  useEffect(() => {
    const hardcodedEvents: Event[] = [
      {
        id: 1,
        title: "Chapter Meeting",
        date: new Date(2024, 1, 16),
        time: "5:00-6:00PM",
        location: "Everitt Labratory",
        tag: "Sisterhood",
        tagColor: "bg-purple-200 text-purple-700",
        attendees: 7,
        status: "upcoming",
      },
      {
        id: 2,
        title: "Daily Standup Call",
        date: new Date(2024, 1, 16),
        time: "5:00-6:00PM",
        location: "Everitt Labratory",
        tag: "Sisterhood",
        tagColor: "bg-purple-200 text-purple-700",
        attendees: 7,
        status: "upcoming",
      },
      {
        id: 3,
        title: "Chapter Meeting",
        date: new Date(2024, 1, 16),
        time: "5:00-6:00PM",
        location: "Everitt Labratory",
        tag: "Sisterhood",
        tagColor: "bg-purple-200 text-purple-700",
        attendees: 7,
        status: "upcoming",
      }
    ];
    
    const savedEvents = getEvents();
    
    const uniqueEvents = [...hardcodedEvents];
    
    savedEvents.forEach(savedEvent => {
      // Ensure that saved events have the required properties
      const event: Event = {
        ...savedEvent,
        tag: savedEvent.tag || "General",
        tagColor: savedEvent.tagColor || "bg-gray-200 text-gray-700",
        status: savedEvent.status || "upcoming"
      };
      
      if (!uniqueEvents.some(e => e.id === event.id)) {
        uniqueEvents.push(event);
      }
    });
    
    setEvents(uniqueEvents);
  }, []);

  const handleTabClick = (tab: string) => {
    if (tab === "Going") {
      navigate("/");
    } else if (tab === "Explore") {
      navigate("/explore");
    } else {
      setActiveTab(tab);
    }
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };
  
  const handleCalendarClick = () => {
    navigate("/calendar");
  };
  
  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  const handleNotificationsClick = () => {
    navigate("/notifications");
  };
  
  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilters = (filters: EventFilters) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.tag && event.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Apply additional filters if any are active
  const applyFilters = (events: Event[]) => {
    if (activeFilters.eventTypes.length === 0 && 
        activeFilters.tags.length === 0 && 
        !activeFilters.startDate && 
        !activeFilters.endDate) {
      return events;
    }

    return events.filter(event => {
      // Filter by event type (tag)
      if (activeFilters.eventTypes.length > 0 && 
          event.tag && 
          !activeFilters.eventTypes.includes(event.tag.toLowerCase())) {
        return false;
      }

      // Filter by date range
      if (activeFilters.startDate && event.date < activeFilters.startDate) {
        return false;
      }
      if (activeFilters.endDate && event.date > activeFilters.endDate) {
        return false;
      }

      return true;
    });
  };

  const finalFilteredEvents = applyFilters(filteredEvents);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold font-big-shoulders">Events</h1>
        <div className="flex gap-4">
          <button 
            className="p-1 bg-white rounded-full"
            onClick={handleNotificationsClick}
          >
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleCalendarClick}>
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleProfileClick}>
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex border-b bg-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center bg-white ${
              activeTab === tab
                ? "text-black font-medium border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button 
            className="p-2 bg-gray-100 rounded-full"
            onClick={handleFilter}
            aria-label="Filter events"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-6 mb-4">
        <button 
          className="bg-purple-700 text-white py-3 px-4 rounded-md w-full flex items-center justify-center"
          onClick={handleCreateEvent}
        >
          <span className="mr-2">+</span>
          Create New Event
        </button>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-24">
        <div className="space-y-4">
          {finalFilteredEvents.map((event, index) => (
            <YourEventCard key={event.id} event={event} index={index} />
          ))}
          
          {finalFilteredEvents.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              {searchTerm ? 
                `No events found matching "${searchTerm}"` : 
                "No events found with the current filters"
              }
            </div>
          )}
        </div>
      </div>

      {checkInEvent && (
        <CheckInDialog 
          open={isCheckInOpen} 
          onOpenChange={setIsCheckInOpen} 
          event={checkInEvent} 
        />
      )}

      {/* Filter Sheet */}
      <EventFilterSheet 
        open={isFilterOpen} 
        onOpenChange={setIsFilterOpen} 
        onApplyFilters={handleApplyFilters}
      />

      <TabBar />
    </div>
  );
};

export default YourEvents;
