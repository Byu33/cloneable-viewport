
import React, { useState } from "react";
import { User, Calendar, Search, Bell, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TabBar from "@/components/TabBar";
import ExploreEventCard from "@/components/ExploreEventCard";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const tabs = ["Going", "Explore", "Your Events"];
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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
    // Handle filtering
    console.log("Opening filter options");
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Sample event data for different categories
  const sampleEvent = {
    id: 1,
    title: "Daily Standup Call",
    time: "5:00-6:00PM",
    location: "Everitt Labratory",
    date: new Date("2024-02-16"),
    tag: "Sisterhood",
    tagColor: "bg-purple-200 text-purple-700",
    attendees: 7,
    status: "upcoming" as const
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
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

      {/* Search Bar */}
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
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 pb-24">
        {/* Suggested Events */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Suggested</h2>
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap pb-4 -mx-1">
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap pb-4 -mx-1">
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </section>

        {/* Professional Events */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Professional</h2>
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap pb-4 -mx-1">
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </section>

        {/* Fundraising Events */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Fundraising</h2>
          <div className="relative">
            <div className="overflow-x-auto whitespace-nowrap pb-4 -mx-1">
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
              <div className="inline-block px-1">
                <ExploreEventCard event={sampleEvent} />
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Tab Bar */}
      <TabBar />
    </div>
  );
};

export default Explore;
