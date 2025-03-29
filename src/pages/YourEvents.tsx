import React, { useState } from "react";
import { User, Calendar, Search, MoreVertical } from "lucide-react";
import TabBar from "@/components/TabBar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const YourEvents = () => {
  const [activeTab, setActiveTab] = useState("Your Events");
  const tabs = ["Going", "Explore", "Your Events"];

  const handleTabClick = (tab: string) => {
    if (tab === "Going") {
      window.location.href = "/";
    } else if (tab === "Explore") {
      window.location.href = "/explore";
    } else {
      setActiveTab(tab);
    }
  };

  const yourEvents = [
    {
      id: 1,
      title: "Daily Standup Call",
      date: "Feb 16",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Sisterhood",
      attendees: 7,
    },
    {
      id: 2,
      title: "Daily Standup Call",
      date: "Feb 16",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Sisterhood",
      attendees: 7,
    },
    {
      id: 3,
      title: "Daily Standup Call",
      date: "Feb 16",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Sisterhood",
      attendees: 7,
    }
  ];

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
        <button className="bg-purple-700 text-white py-3 px-4 rounded-md w-full flex items-center justify-center">
          <span className="mr-2">+</span>
          Create New Event
        </button>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-20">
        <div className="space-y-4">
          {yourEvents.map((event, index) => (
            <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm relative">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-600">{event.date} {event.time}</p>
                  <p className="text-gray-600">{event.location}</p>
                  
                  <div className="flex flex-col mt-3">
                    <span className="text-sm text-gray-500 mb-1">
                      {event.attendees} people have signed up
                    </span>
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(5, event.attendees))].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                        >
                          <Avatar className="w-full h-full">
                            <AvatarImage 
                              src={`https://randomuser.me/api/portraits/thumb/men/${i + 1}.jpg`} 
                              alt="Attendee"
                            />
                            <AvatarFallback>U{i+1}</AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {index === 0 ? (
                    <div className="flex gap-2 mt-3">
                      <Button className="bg-purple-900 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded-md">
                        Attendance
                      </Button>
                      <Button variant="ghost" className="text-purple-700 text-sm">
                        Edit Event
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <Button variant="ghost" className="text-purple-700 text-sm px-0 py-2">
                        Edit Event
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs">
                    {event.tag}
                  </span>
                  
                  {index !== 0 && (
                    <button className="mt-2">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default YourEvents;
