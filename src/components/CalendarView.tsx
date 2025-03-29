
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CalendarViewProps {
  isExpanded: boolean;
  title?: string;
  onToggleExpand?: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  isExpanded, 
  title = "Calendar", 
  onToggleExpand 
}) => {
  // Current month data for the calendar
  const currentMonth = new Date();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  // Get days from previous month to fill the first week
  const daysFromPrevMonth = firstDay.getDay();
  const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();

  // Generate calendar days
  const calendarDays = [];

  // Previous month days
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Current month days
  const today = new Date();
  for (let i = 1; i <= lastDay.getDate(); i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isToday:
        i === today.getDate() &&
        currentMonth.getMonth() === today.getMonth() &&
        currentMonth.getFullYear() === today.getFullYear(),
    });
  }

  // Next month days to complete the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows of 7 days
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Group days into weeks for the expanded calendar
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // For compact view, just show 2 weeks
  const compactFirstWeek = calendarDays.slice(0, 7);
  const compactSecondWeek = calendarDays.slice(7, 14);
  
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* Title and toggle button */}
      <button
        className="flex items-center justify-between w-full mb-4"
        onClick={onToggleExpand}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isExpanded ? (
        // Expanded Calendar View
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center gap-y-2">
            {days.map((day) => (
              <div key={day} className="text-sm font-medium">{day}</div>
            ))}

            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`py-2 relative ${
                    day.isToday
                      ? "bg-purple-100 rounded-full font-bold text-purple-900"
                      : day.isCurrentMonth
                        ? "font-medium"
                        : "text-gray-300"
                  }`}
                >
                  {day.day}
                  {/* Example event indicators */}
                  {day.isCurrentMonth && day.day === 30 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
                  )}
                  {day.isCurrentMonth && day.day === 2 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Events for selected day */}
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium mb-2">Events on Selected Day</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Chapter Meeting</p>
                  <p className="text-xs text-gray-500">5:00-6:00PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Daily Standup Call</p>
                  <p className="text-xs text-gray-500">5:00-6:00PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Compact Calendar View
        <div className="grid grid-cols-7 text-center gap-y-2">
          {days.map((day) => (
            <div key={day} className="text-sm font-medium">{day}</div>
          ))}

          {/* First Week */}
          {compactFirstWeek.map((date, index) => (
            <div
              key={`first-${index}`}
              className={`text-sm py-1 ${
                date.isToday
                  ? "bg-purple-100 text-purple-900 rounded-full font-bold w-7 h-7 flex items-center justify-center mx-auto"
                  : date.isCurrentMonth
                  ? "font-medium"
                  : "text-gray-300"
              }`}
            >
              {date.day}
            </div>
          ))}

          {/* Second Week */}
          {compactSecondWeek.map((date, index) => (
            <div
              key={`second-${index}`}
              className={`text-sm py-1 ${
                date.isCurrentMonth ? "font-medium" : "text-gray-300"
              }`}
            >
              {date.day}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
