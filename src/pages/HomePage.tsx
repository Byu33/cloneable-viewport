import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import { NavigationProp } from "@/types/navigation";

type IconName = keyof typeof Feather.glyphMap;

const HomePage = () => {
  const navigation = useNavigation<NavigationProp>();

  const upcomingEvents = [
    {
      id: 1,
      title: "Daily Standup Call",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Sisterhood",
      attendees: 7,
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Turn in Dues",
      dueDate: "Tomorrow",
      priority: "High Importance",
      priorityColor: "#7C3AED",
    },
    {
      id: 2,
      title: "Contact Venue",
      dueDate: "Tomorrow",
      assignedBy: "Me",
      priority: "Officer Task",
      priorityColor: "#E9D5FF",
      category: "Risk",
      categoryColor: "#E9D5FF",
    }
  ];

  const requirements = {
    completed: 1,
    total: 7,
    upcoming: [
      { id: 1, title: "1 Sisterhood Event", tag: "Sisterhood" },
      { id: 2, title: "1 Professional Event", tag: "Professional" }
    ]
  };

  const handleNotifications = () => {
    navigation.navigate("Notifications" as keyof NavigationProp['navigate']);
  };

  const handleSeeAllEvents = () => {
    navigation.navigate("Calendar" as keyof NavigationProp['navigate']);
  };

  const handleSeeAllTasks = () => {
    navigation.navigate("ToDo" as keyof NavigationProp['navigate']);
  };

  const handleRequirementClick = (tag: string) => {
    navigation.navigate("Requirements" as keyof NavigationProp['navigate']);
  };

  const handlePayNow = () => {
    navigation.navigate("Dues" as keyof NavigationProp['navigate']);
  };

  const handlePaymentPlan = () => {
    navigation.navigate("Dues" as keyof NavigationProp['navigate']);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleNotifications}>
              <Feather name="bell" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Calendar" as keyof NavigationProp['navigate'])}>
              <Feather name="calendar" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile" as keyof NavigationProp['navigate'])}>
              <Feather name="user" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={handleSeeAllEvents}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => navigation.navigate("EventDetails", { eventId: event.id.toString() })}
            >
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>{event.time} • {event.location}</Text>
                <View style={styles.eventTag}>
                  <Text style={styles.tagText}>{event.tag}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
            <TouchableOpacity onPress={handleSeeAllTasks}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => navigation.navigate("TaskDetail", { taskId: task.id.toString() })}
            >
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDueDate}>Due {task.dueDate}</Text>
                <View style={[styles.taskPriority, { backgroundColor: task.priorityColor }]}>
                  <Text style={styles.priorityText}>{task.priority}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.requirementsProgress}>
            <Text style={styles.progressText}>
              {requirements.completed}/{requirements.total} Completed
            </Text>
          </View>
          {requirements.upcoming.map((req) => (
            <TouchableOpacity
              key={req.id}
              style={styles.requirementCard}
              onPress={() => handleRequirementClick(req.tag)}
            >
              <Text style={styles.requirementTitle}>{req.title}</Text>
              <View style={styles.requirementTag}>
                <Text style={styles.tagText}>{req.tag}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  content: {
    flex: 1,
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
  headerButtons: {
    flexDirection: "row",
    gap: 16,
  },
  section: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  seeAll: {
    color: "#6B7280",
  },
  eventCard: {
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
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  eventDetails: {
    color: "#6B7280",
    marginBottom: 8,
  },
  eventTag: {
    backgroundColor: "#E9D5FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  tagText: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "500",
  },
  taskCard: {
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
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  taskDueDate: {
    color: "#6B7280",
    marginBottom: 8,
  },
  taskPriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  requirementsProgress: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 16,
    color: "#6B7280",
  },
  requirementCard: {
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
  requirementTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  requirementTag: {
    backgroundColor: "#E9D5FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default HomePage;
