
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Search, MapPin } from "lucide-react";
import TabBar from "@/components/TabBar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CheckInDialog from "@/components/CheckInDialog";
import { getEvents, Event } from "@/utils/eventStorage";
import YourEventCard from "@/components/YourEventCard";

const YourEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Your Events");
  const tabs = ["Going", "Explore", "Your Events"];
  const [checkInEvent, setCheckInEvent] = useState<Event | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const hardcodedEvents = [
      {
        id: 1,
        title: "Chapter Meeting",
        date: new Date(2024, 1, 16),
        time: "5:00-6:00PM",
        location: "Everitt Labratory",
        tag: "Sisterhood",
        tagColor: "bg-purple-200 text-purple-700",
        attendees: 7,
        status: "upcoming" as const,
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
        status: "upcoming" as const,
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
        status: "upcoming" as const,
      }
    ];
    
    const savedEvents = getEvents();
    
    const uniqueEvents = [...hardcodedEvents];
    
    savedEvents.forEach(savedEvent => {
      if (!uniqueEvents.some(event => event.id === savedEvent.id)) {
        uniqueEvents.push(savedEvent);
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold font-big-shoulders">Events</h1>
        <div className="flex gap-4">
          <button className="p-1 bg-white rounded-full">
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full">
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
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
          />
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

      <div className="flex-1 overflow-auto px-6 pb-20">
        <div className="space-y-4">
          {events.map((event, index) => (
            <YourEventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>

      {checkInEvent && (
        <CheckInDialog 
          open={isCheckInOpen} 
          onOpenChange={setIsCheckInOpen} 
          event={checkInEvent} 
        />
      )}

      <TabBar />
    </div>
  );
};

export default YourEvents;
