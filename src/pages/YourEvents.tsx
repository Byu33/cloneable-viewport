
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight } from "lucide-react";
import TabBar from "@/components/TabBar";
import YourEventCard from "@/components/YourEventCard";
import { getStoredEvents, Event } from "@/utils/eventStorage";

const upcomingEvents = [
  {
    id: 1,
    title: "Alpha Phi Chapter Meeting",
    date: new Date("2023-11-05"),
    time: "7:00 PM - 8:30 PM",
    location: "Student Center Room 302",
    tag: "Chapter",
    tagColor: "bg-purple-200 text-purple-700",
    attendees: 42,
    status: "upcoming" as const,
  },
  {
    id: 2,
    title: "Phi Mu Fundraiser",
    date: new Date("2023-11-07"),
    time: "12:00 PM - 3:00 PM",
    location: "Campus Quad",
    tag: "Fundraising",
    tagColor: "bg-yellow-200 text-yellow-700",
    attendees: 18,
    status: "upcoming" as const,
  },
  {
    id: 3,
    title: "Pi Beta Phi Social",
    date: new Date("2023-11-10"),
    time: "8:00 PM - 11:00 PM",
    location: "Greek Row House #12",
    tag: "Social",
    tagColor: "bg-pink-200 text-pink-700",
    attendees: 35,
    status: "upcoming" as const,
  }
];

const pastEvents = [
  {
    id: 4,
    title: "New Member Orientation",
    date: new Date("2023-10-20"),
    time: "6:00 PM - 7:30 PM",
    location: "Chapter House",
    tag: "Chapter",
    tagColor: "bg-purple-200 text-purple-700",
    attendees: 22,
    status: "completed" as const,
  },
  {
    id: 5,
    title: "Homecoming Preparation",
    date: new Date("2023-10-15"),
    time: "2:00 PM - 5:00 PM",
    location: "Art Studio",
    tag: "Event",
    tagColor: "bg-blue-200 text-blue-700",
    attendees: 28,
    status: "completed" as const,
  }
];

const YourEvents = () => {
  const [combinedUpcomingEvents, setCombinedUpcomingEvents] = useState([...upcomingEvents]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const storedEvents = getStoredEvents();
    const formattedStoredEvents = storedEvents.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      tag: event.tag || "Event", // Provide default values for optional fields
      tagColor: event.tagColor || "bg-purple-200 text-purple-700",
      attendees: event.attendees || 0,
      status: "upcoming" as const
    }));
    
    setCombinedUpcomingEvents([...upcomingEvents, ...formattedStoredEvents]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold">Your Events</h1>
          <Link 
            to="/create-event" 
            className="inline-flex items-center justify-center p-2 rounded-full bg-purple-100 text-purple-700"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`py-2 px-1 font-medium text-sm ${
              activeTab === "upcoming" 
                ? "text-purple-700 border-b-2 border-purple-700" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`py-2 px-1 font-medium text-sm ${
              activeTab === "past" 
                ? "text-purple-700 border-b-2 border-purple-700" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>
      </header>
      
      <main className="p-4">
        <div className="space-y-4">
          {activeTab === "upcoming" ? (
            combinedUpcomingEvents.length > 0 ? (
              combinedUpcomingEvents.map(event => (
                <YourEventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No upcoming events
              </div>
            )
          ) : (
            pastEvents.map(event => (
              <YourEventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </main>
      
      <TabBar />
    </div>
  );
};

export default YourEvents;
