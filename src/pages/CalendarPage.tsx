
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import TabBar from "@/components/TabBar";
import { format, addMonths, subMonths } from "date-fns";

const CalendarPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Mock data for events and tasks
  const calendarItems = [
    { 
      id: 1, 
      title: "Chapter Meeting", 
      date: new Date(2024, new Date().getMonth(), 15), 
      type: "event",
      tag: "Required"
    },
    { 
      id: 2, 
      title: "Turn in Dues", 
      date: new Date(2024, new Date().getMonth(), 17), 
      type: "task",
      priority: "High"
    },
    { 
      id: 3, 
      title: "Sisterhood Event", 
      date: new Date(2024, new Date().getMonth(), 20), 
      type: "event",
      tag: "Sisterhood"
    },
    { 
      id: 4, 
      title: "Complete Form", 
      date: new Date(2024, new Date().getMonth(), 22), 
      type: "task",
      priority: "Medium"
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleItemClick = (item: typeof calendarItems[0]) => {
    if (item.type === "event") {
      navigate(`/event/${item.id}`);
    } else {
      navigate(`/task/${item.id}`);
    }
  };

  // Filter items for the selected day
  const selectedDayItems = calendarItems.filter(
    item => item.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Calendar</h1>
      </header>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-1">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={handleNextMonth} className="p-1">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            month={currentMonth}
            className="rounded-md"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-4">
            {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
          </h2>
          
          {selectedDayItems.length > 0 ? (
            <div className="space-y-3">
              {selectedDayItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 border border-gray-200 rounded-lg cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.type === "event" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {item.type === "event" ? item.tag : item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.type === "event" ? "Event" : "Task"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No events or tasks for this day
            </p>
          )}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default CalendarPage;
