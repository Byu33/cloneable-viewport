
import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  isExpanded: boolean;
  title?: string;
  onToggleExpand?: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  isExpanded,
  title = "Calendar",
  onToggleExpand,
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
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Title and toggle button */}
      <button 
        className="w-full flex justify-between items-center mb-4" 
        onClick={onToggleExpand}
      >
        <span className="text-lg font-semibold">{title}</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded ? (
        // Expanded Calendar View
        <div className="overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button className="p-1 bg-gray-100 rounded-full">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 bg-gray-100 rounded-full">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className="text-center font-medium text-sm">
                {day}
              </div>
            ))}

            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`
                    relative py-2 text-center
                    ${day.isToday ? 'bg-purple-200 text-purple-900 rounded-full font-bold' : ''}
                    ${day.isCurrentMonth ? 'font-medium' : 'text-gray-400'}
                  `}
                >
                  <div>{day.day}</div>
                  {/* Example event indicators */}
                  {day.isCurrentMonth && day.day === 15 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-700 rounded-full"></div>
                  )}
                  {day.isCurrentMonth && day.day === 22 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-700 rounded-full"></div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Events for selected day */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2">Events on Selected Day</h3>
            <div className="bg-gray-50 p-3 rounded-md mb-2 flex">
              <div className="w-2 h-2 bg-purple-700 rounded-full mt-2 mr-2"></div>
              <div>
                <div className="font-medium">Chapter Meeting</div>
                <div className="text-sm text-gray-600">5:00-6:00PM</div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md flex">
              <div className="w-2 h-2 bg-purple-700 rounded-full mt-2 mr-2"></div>
              <div>
                <div className="font-medium">Daily Standup Call</div>
                <div className="text-sm text-gray-600">5:00-6:00PM</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Compact Calendar View
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <div key={day} className="text-center font-medium text-sm">
              {day}
            </div>
          ))}

          {/* First Week */}
          {compactFirstWeek.map((date, index) => (
            <div
              key={`first-${index}`}
              className={`
                py-2 text-center
                ${date.isToday ? 'bg-purple-200 text-purple-900 rounded-full font-bold' : ''}
                ${date.isCurrentMonth ? 'font-medium' : 'text-gray-400'}
              `}
            >
              {date.day}
            </div>
          ))}

          {/* Second Week */}
          {compactSecondWeek.map((date, index) => (
            <div
              key={`second-${index}`}
              className={`
                py-2 text-center
                ${date.isCurrentMonth ? 'font-medium' : 'text-gray-400'}
              `}
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
