import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";

export interface CalendarProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Calendar = ({
  selectedDate = new Date(),
  onSelectDate,
  minDate,
  maxDate,
  style,
  textStyle,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate);
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleSelectDate = (date: Date) => {
    if (onSelectDate) {
      onSelectDate(date);
    }
  };
  
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <Feather name="chevron-left" size={20} color="#6B7280" />
        </TouchableOpacity>
        <Text style={[styles.monthText, textStyle]}>
          {format(currentMonth, "MMMM yyyy")}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <Feather name="chevron-right" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <Text key={day} style={[styles.weekDay, textStyle]}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.daysContainer}>
        {days.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);
          const disabled = isDateDisabled(day);
          
          return (
            <TouchableOpacity
              key={day.toISOString()}
              style={[
                styles.dayButton,
                isSelected && styles.selectedDay,
                isCurrentDay && !isSelected && styles.todayDay,
                !isCurrentMonth && styles.outsideDay,
                disabled && styles.disabledDay,
              ]}
              onPress={() => !disabled && handleSelectDate(day)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  !isCurrentMonth && styles.outsideDayText,
                  disabled && styles.disabledDayText,
                  textStyle,
                ]}
              >
                {format(day, "d")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDay: {
    width: 36,
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 4,
  },
  dayText: {
    fontSize: 14,
  },
  selectedDay: {
    backgroundColor: "#7C3AED",
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  todayDay: {
    backgroundColor: "#F3F4F6",
  },
  outsideDay: {
    opacity: 0.5,
  },
  outsideDayText: {
    color: "#9CA3AF",
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: "#9CA3AF",
  },
});

export { Calendar };
