
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CalendarView from "@/components/CalendarView";
import TabBar from "@/components/TabBar";

const CalendarPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Calendar</h1>
      </header>

      <div className="px-6 py-4 flex-1 overflow-auto">
        <CalendarView isExpanded={true} title="Calendar View" />
        
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-700">You have no upcoming events</p>
          </div>
          
          <h2 className="text-xl font-semibold mt-8">Upcoming Tasks</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-700">You have no upcoming tasks</p>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default CalendarPage;
