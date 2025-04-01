import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { ChevronDown, ChevronUp } from "react-native-feather";

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
    <View style={styles.container}>
      {/* Title and toggle button */}
      <TouchableOpacity style={styles.toggleButton} onPress={onToggleExpand}>
        <Text style={styles.title}>{title}</Text>
        {isExpanded ? <ChevronUp width={20} height={20} /> : <ChevronDown width={20} height={20} />}
      </TouchableOpacity>

      {isExpanded ? (
        // Expanded Calendar View
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.monthYear}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</Text>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navButton}>
                <ChevronLeft width={20} height={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <ChevronRight width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.grid}>
            {days.map((day) => (
              <Text key={day} style={styles.dayHeader}>{day}</Text>
            ))}

            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <View
                  key={`${weekIndex}-${dayIndex}`}
                  style={[
                    styles.day,
                    day.isToday ? styles.today : null,
                    day.isCurrentMonth ? styles.currentMonth : styles.otherMonth,
                  ]}
                >
                  <Text>{day.day}</Text>
                  {/* Example event indicators */}
                  {day.isCurrentMonth && day.day === 30 && (
                    <View style={styles.eventIndicator}></View>
                  )}
                  {day.isCurrentMonth && day.day === 2 && (
                    <View style={styles.eventIndicator}></View>
                  )}
                </View>
              ))
            )}
          </View>

          {/* Events for selected day */}
          <View style={styles.events}>
            <Text style={styles.eventsTitle}>Events on Selected Day</Text>
            <View style={styles.eventItem}>
              <View style={styles.eventIndicator}></View>
              <View>
                <Text style={styles.eventTitle}>Chapter Meeting</Text>
                <Text style={styles.eventTime}>5:00-6:00PM</Text>
              </View>
            </View>
            <View style={styles.eventItem}>
              <View style={styles.eventIndicator}></View>
              <View>
                <Text style={styles.eventTitle}>Daily Standup Call</Text>
                <Text style={styles.eventTime}>5:00-6:00PM</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        // Compact Calendar View
        <View style={styles.grid}>
          {days.map((day) => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}

          {/* First Week */}
          {compactFirstWeek.map((date, index) => (
            <View
              key={`first-${index}`}
              style={[
                styles.day,
                date.isToday ? styles.todayCompact : null,
                date.isCurrentMonth ? styles.currentMonth : styles.otherMonth,
              ]}
            >
              <Text>{date.day}</Text>
            </View>
          ))}

          {/* Second Week */}
          {compactSecondWeek.map((date, index) => (
            <View
              key={`second-${index}`}
              style={[
                styles.day,
                date.isCurrentMonth ? styles.currentMonth : styles.otherMonth,
              ]}
            >
              <Text>{date.day}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row",
    gap: 10,
  },
  navButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayHeader: {
    flexBasis: "14.28%",
    textAlign: "center",
    fontWeight: "bold",
  },
  day: {
    flexBasis: "14.28%",
    textAlign: "center",
    paddingVertical: 10,
    position: "relative",
  },
  today: {
    backgroundColor: "#e0bbff",
    borderRadius: 50,
    fontWeight: "bold",
    color: "#6a1b9a",
  },
  currentMonth: {
    fontWeight: "bold",
  },
  otherMonth: {
    color: "#d3d3d3",
  },
  todayCompact: {
    backgroundColor: "#e0bbff",
    borderRadius: 50,
    fontWeight: "bold",
    color: "#6a1b9a",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  eventIndicator: {
    position: "absolute",
    bottom: 2,
    left: "50%",
    transform: [{ translateX: -2 }],
    width: 4,
    height: 4,
    backgroundColor: "#6a1b9a",
    borderRadius: 50,
  },
  events: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
    paddingTop: 10,
  },
  eventsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
  },
  eventTitle: {
    fontWeight: "bold",
  },
  eventTime: {
    color: "#888",
  },
});

export default CalendarView;
