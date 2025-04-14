import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import TabBar from "@/components/TabBar";
import { format, addMonths, subMonths } from "date-fns";
import { NavigationProp } from "@/types/navigation";

const CalendarPage = () => {
  const navigation = useNavigation<NavigationProp>();
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
    navigation.goBack();
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleItemClick = (item: typeof calendarItems[0]) => {
    if (item.type === "event") {
      navigation.navigate("EventDetails", { eventId: item.id.toString() });
    } else {
      navigation.navigate("TaskDetail", { taskId: item.id.toString() });
    }
  };

  const renderCalendarHeader = () => (
    <View style={styles.calendarHeader}>
      <TouchableOpacity onPress={handlePrevMonth}>
        <Icon name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.monthText}>
        {format(currentMonth, "MMMM yyyy")}
      </Text>
      <TouchableOpacity onPress={handleNextMonth}>
        <Icon name="chevron-right" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderCalendarDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <Text key={day} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderCalendarGrid = () => {
    // This is a simplified version. In a real app, you'd want to use a proper calendar library
    return (
      <View style={styles.calendarGrid}>
        {/* Calendar grid implementation */}
      </View>
    );
  };

  const renderCalendarItems = () => (
    <View style={styles.itemsContainer}>
      {calendarItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.itemCard}
          onPress={() => handleItemClick(item)}
        >
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDate}>
              {format(item.date, "MMMM d, yyyy")}
            </Text>
          </View>
          <View style={[
            styles.itemTag,
            { backgroundColor: item.type === "event" ? "#E9D5FF" : "#F3E8FF" }
          ]}>
            <Text style={[
              styles.tagText,
              { color: item.type === "event" ? "#7C3AED" : "#9333EA" }
            ]}>
              {item.type === "event" ? item.tag : item.priority}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {renderCalendarHeader()}
        {renderCalendarDays()}
        {renderCalendarGrid()}
        {renderCalendarItems()}
      </ScrollView>

      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  dayText: {
    width: 40,
    textAlign: "center",
    color: "#6B7280",
  },
  calendarGrid: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  itemsContainer: {
    padding: 16,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemDate: {
    color: "#6B7280",
  },
  itemTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default CalendarPage;
