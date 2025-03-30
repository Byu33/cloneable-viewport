
import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import YourEventCard from "@/components/YourEventCard";
import TabBar from "@/components/TabBar";

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
  const [activeTab, setActiveTab] = useState("Your Events");
  const navigate = useNavigate();
  const tabs = ["Going", "Explore", "Your Events"];

  const handleTabClick = (tab: string) => {
    if (tab === "Going") {
      navigate("/");
    } else if (tab === "Explore") {
      navigate("/explore");
    } else {
      setActiveTab(tab);
    }
  };

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
        {/* Create Event Button */}
        <button 
          onClick={() => navigate("/create-event")}
          className="w-full bg-purple-700 text-white py-3 rounded-lg mb-6 font-medium"
        >
          Create an Event
        </button>
        
        {/* Event Cards */}
        <div className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          {upcomingEvents.map((event) => (
            <YourEventCard 
              key={event.id} 
              event={event}
            />
          ))}
        </div>

        {/* Past Events Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <YourEventCard 
                key={event.id} 
                event={event}
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
