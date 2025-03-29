
import React from "react";

const CalendarView = () => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  
  // Generate dates for the calendar (simplified version)
  const calendarDates = [
    { day: 26, isCurrentMonth: false },
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: true, isToday: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
  ];

  // Divide dates into weeks
  const firstWeek = calendarDates.slice(0, 7);
  const secondWeek = calendarDates.slice(7, 14);

  return (
    <div className="bg-white rounded-xl p-4">
      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center mb-2">
        {days.map((day) => (
          <div key={day} className="text-xs font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar dates - first week */}
      <div className="grid grid-cols-7 text-center mb-2">
        {firstWeek.map((date) => (
          <div
            key={`first-${date.day}`}
            className={`text-sm py-1 ${
              date.isToday
                ? "bg-black text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto"
                : date.isCurrentMonth
                ? "text-black"
                : "text-gray-300"
            }`}
          >
            {date.day}
          </div>
        ))}
      </div>

      {/* Calendar dates - second week */}
      <div className="grid grid-cols-7 text-center">
        {secondWeek.map((date) => (
          <div
            key={`second-${date.day}`}
            className={`text-sm py-1 ${
              date.isCurrentMonth ? "text-black" : "text-gray-300"
            }`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
