
import React, { useState } from "react";
import { User, Calendar, Search, Bell, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TabBar from "@/components/TabBar";
import ExploreEventCard from "@/components/ExploreEventCard";
import EventFilterSheet from "@/components/EventFilterSheet";
import { EventFilters } from "@/components/EventFilterSheet";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const tabs = ["Going", "Explore", "Your Events"];
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<EventFilters>({
    eventTypes: [],
    tags: [],
    attendeeStatus: [],
    startDate: undefined,
    endDate: undefined
  });

  const handleTabClick = (tab: string) => {
    if (tab === "Going") {
      navigate("/");
    } else if (tab === "Your Events") {
      navigate("/your-events");
    } else {
      setActiveTab(tab);
    }
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
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilters = (filters: EventFilters) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
  };

  // Sample event data for different categories
  const sampleEvent = {
    id: 1,
    title: "Daily Standup Call",
    time: "5:00-6:00PM",
    location: "Everitt Laboratory",
    date: new Date("2024-05-20"),
    tag: "Workshop",
    tagColor: "bg-brand-lavender text-brand-purple",
    attendees: 7,
    status: "upcoming" as const
  };

  const sampleEvent2 = {
    ...sampleEvent,
    id: 2,
    title: "Arts & Culture Tour",
    date: new Date("2024-05-28"),
    tag: "Arts & Culture",
    tagColor: "bg-tag-blue-bg text-tag-blue-text"
  };

  return (
    <div className="flex flex-col h-screen bg-brand-light">
      {/* Header */}
      <header className="flex flex-col px-6 pt-6 pb-4 bg-brand-light">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Hello, Simone</h2>
            <p className="text-brand-purple text-lg">There are 25 new events in your area.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-lavender border-2 border-white overflow-hidden">
            {/* This would be a user profile image */}
          </div>
        </div>
        
        <div className="relative flex items-center w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for an event"
            className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-200 bg-white shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button 
            className="absolute right-4 p-1 bg-transparent rounded-full"
            onClick={handleFilter}
            aria-label="Filter events"
          >
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 pb-24">
        {/* You might like */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">You might like</h2>
            <button className="text-brand-purple font-medium text-sm">See All</button>
          </div>
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap pb-4 -mx-1">
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent2} />
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming</h2>
            <button className="text-brand-purple font-medium text-sm">See All</button>
          </div>
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap pb-4 -mx-1">
              <div className="inline-block px-1">
                <ExploreEventCard event={{
                  ...sampleEvent,
                  id: 3,
                  tag: "Sisterhood",
                  tagColor: "bg-tag-purple-bg text-tag-purple-text"
                }} />
              </div>
              <div className="inline-block px-1">
                <ExploreEventCard event={{
                  ...sampleEvent,
                  id: 4,
                  tag: "Workshop",
                  tagColor: "bg-tag-green-bg text-tag-green-text"
                }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Filter Sheet */}
      <EventFilterSheet 
        open={isFilterOpen} 
        onOpenChange={setIsFilterOpen} 
        onApplyFilters={handleApplyFilters}
      />

      {/* Bottom Tab Bar */}
      <TabBar />
    </div>
  );
};

export default Explore;
