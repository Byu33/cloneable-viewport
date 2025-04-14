import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "event" | "task" | "system";
  read: boolean;
}

const NotificationsPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Event Reminder",
      message: "Daily Standup Call starts in 30 minutes",
      time: "5 minutes ago",
      type: "event",
      read: false,
    },
    {
      id: "2",
      title: "Task Due",
      message: "Turn in Dues is due tomorrow",
      time: "1 hour ago",
      type: "task",
      read: false,
    },
    {
      id: "3",
      title: "System Update",
      message: "New features have been added to the app",
      time: "2 hours ago",
      type: "system",
      read: true,
    },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Navigate based on type
    switch (notification.type) {
      case "event":
        navigation.navigate("EventDetails", { eventId: notification.id });
        break;
      case "task":
        navigation.navigate("TaskDetail", { taskId: notification.id });
        break;
      default:
        break;
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "event":
        return "calendar";
      case "task":
        return "check-square";
      case "system":
        return "info";
      default:
        return "bell";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllRead} style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadNotification,
            ]}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={styles.notificationIcon}>
              <Icon
                name={getNotificationIcon(notification.type)}
                size={24}
                color="#7C3AED"
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  markAllButton: {
    padding: 4,
  },
  markAllText: {
    color: "#7C3AED",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
  },
  unreadNotification: {
    backgroundColor: "#F3E8FF",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});

export default NotificationsPage;
