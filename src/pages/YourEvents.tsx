
import React, { useState } from "react";
import { Calendar, User, Bell, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import YourEventCard from "@/components/YourEventCard";
import TabBar from "@/components/TabBar";
import CalendarView from "@/components/CalendarView";

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
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const navigate = useNavigate();

  // Mock data for events
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Chapter Meeting",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Required",
      tagColor: "bg-purple-200 text-purple-700",
      date: new Date(),
      attendees: 12,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Daily Standup Call",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Sisterhood",
      tagColor: "bg-purple-200 text-purple-700",
      attendees: 7,
      date: new Date(),
      status: "upcoming"
    }
  ];

  const pastEvents: Event[] = [
    {
      id: 3,
      title: "Decorating Cakes",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      date: new Date("2024-02-16"),
      tag: "Risk",
      tagColor: "bg-purple-200 text-purple-700",
      status: "past"
    }
  ];

  const handleNotifications = () => {
    navigate("/notifications");
  };

  const handleCalendar = () => {
    navigate("/calendar");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-figtree">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold font-big-shoulders">Your Events</h1>
        <div className="flex gap-4">
          <button className="p-1 bg-white rounded-full" onClick={handleCalendar}>
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleNotifications}>
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleProfile}>
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {/* Calendar Section */}
        <div className="mb-6">
          {/* Calendar */}
          <CalendarView 
            isExpanded={isCalendarExpanded} 
            title="Your Events"
            onToggleExpand={() => setIsCalendarExpanded(!isCalendarExpanded)}
          />

          {/* Event Cards */}
          <div className="space-y-4 mt-4">
            {upcomingEvents.map((event, index) => (
              <YourEventCard 
                key={event.id} 
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Past Events Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          <div className="space-y-4">
            {pastEvents.map((event, index) => (
              <YourEventCard 
                key={event.id} 
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <TabBar />
    </div>
  );
};

export default YourEvents;
