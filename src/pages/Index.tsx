
import React, { useState } from "react";
import { Calendar, User, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventCard from "@/components/EventCard";
import TabBar from "@/components/TabBar";
import CalendarView from "@/components/CalendarView";
import CheckInDialog from "@/components/CheckInDialog";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Going");
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const tabs = ["Going", "Explore", "Your Events"];
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    if (tab === "Explore") {
      navigate("/explore");
    } else if (tab === "Your Events") {
      navigate("/your-events");
    } else {
      setActiveTab(tab);
    }
  };

  const handleCheckIn = (event: any) => {
    setSelectedEvent(event);
    setIsCheckInOpen(true);
  };

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Chapter Meeting",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Required",
      tagColor: "bg-purple-200 text-purple-700",
      date: new Date(),
      status: "upcoming" as const
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
      status: "upcoming" as const
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Decorating Cakes",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      date: new Date("2024-02-16"),
      tag: "Risk",
      tagColor: "bg-purple-200 text-purple-700",
      status: "past" as const
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-figtree">
      {/* Header */}
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

      {/* Tabs */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {/* Calendar Section */}
        <div className="mb-6">
          {/* Calendar */}
          <CalendarView 
            isExpanded={isCalendarExpanded} 
            title="Upcoming Events"
            onToggleExpand={() => setIsCalendarExpanded(!isCalendarExpanded)}
          />

          {/* Event Cards */}
          <div className="space-y-4 mt-4">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onCheckIn={() => handleCheckIn(event)}
              />
            ))}
          </div>
        </div>

        {/* Past Events Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Check In Dialog */}
      {selectedEvent && (
        <CheckInDialog
          open={isCheckInOpen}
          onOpenChange={setIsCheckInOpen}
          event={{
            title: selectedEvent.title,
            date: selectedEvent.date,
            time: selectedEvent.time,
            location: selectedEvent.location,
            tag: selectedEvent.tag,
            tagColor: selectedEvent.tagColor,
          }}
        />
      )}

      {/* Bottom Tab Bar */}
      <TabBar />
    </div>
  );
};

export default Index;
