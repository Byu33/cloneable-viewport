import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Switch } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { NavigationProp } from "@/types/navigation";

type IconName = keyof typeof Feather.glyphMap;

type EventAttendanceParams = {
  id: string;
};

const EventAttendancePage = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [isCheckedInOpen, setIsCheckedInOpen] = useState(false);

  // Mock data for the event
  const event = {
    id: (route.params as EventAttendanceParams)?.id || "1",
    title: "Daily Standup Call",
    date: new Date(2024, 1, 16),
    time: "5:00-6:00PM",
    location: "Everitt Laboratory",
    tag: "Sisterhood",
    tagColor: "#7C3AED",
  };

  // Mock data for checked-in users
  const checkedInUsers = [
    { id: 1, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    { id: 2, name: "Aparna P", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: 3, name: "Esther S", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 4, name: "Mooshoo C", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 5, name: "Lisa R", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
    { id: 6, name: "Jennifer K", avatar: "https://randomuser.me/api/portraits/women/76.jpg" },
    { id: 7, name: "Maya L", avatar: "https://randomuser.me/api/portraits/women/89.jpg" },
  ];

  // Mock data for signed-up users
  const signedUpUsers = [
    { id: 1, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Leaving early" },
    { id: 2, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Arriving Late" },
    { id: 3, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Meal Preferences" },
    { id: 4, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "" },
    { id: 5, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Leaving early" },
  ];

  // Format date
  const formatDate = (date: Date) => {
    return `Feb ${date.getDate()}`;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditEvent = () => {
    navigation.navigate("EditEvent", { eventId: event.id });
  };

  const handleAddAttendee = () => {
    // Logic to add attendee would go here
    console.log("Adding attendee");
  };

  const handleCheckIn = (userId: number) => {
    // Logic to check in user would go here
    console.log("Checking in user:", userId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{event.title}</Text>
          <Text style={styles.headerSubtitle}>
            {formatDate(event.date)} • {event.time}
          </Text>
        </View>
        <TouchableOpacity onPress={handleEditEvent} style={styles.editButton}>
          <Feather name="edit" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Checked In</Text>
            <TouchableOpacity 
              onPress={() => setIsCheckedInOpen(!isCheckedInOpen)}
              style={styles.toggleButton}
            >
              <Feather 
                name={isCheckedInOpen ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>

          {isCheckedInOpen && (
            <View style={styles.userList}>
              {checkedInUsers.map((user) => (
                <View key={user.id} style={styles.userItem}>
                  <View style={styles.userInfo}>
                    <Image 
                      source={{ uri: user.avatar }} 
                      style={styles.avatar}
                    />
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.checkInButton}
                    onPress={() => handleCheckIn(user.id)}
                  >
                    <Text style={styles.checkInButtonText}>Check In</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Signed Up</Text>
            <TouchableOpacity 
              onPress={handleAddAttendee}
              style={styles.addButton}
            >
              <Feather name="plus" size={20} color="#7C3AED" />
            </TouchableOpacity>
          </View>

          <View style={styles.userList}>
            {signedUpUsers.map((user) => (
              <View key={user.id} style={styles.userItem}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: user.avatar }} 
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.userName}>{user.name}</Text>
                    {user.status && (
                      <Text style={styles.userStatus}>{user.status}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.checkInButton}
                  onPress={() => handleCheckIn(user.id)}
                >
                  <Text style={styles.checkInButtonText}>Check In</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
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
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  toggleButton: {
    padding: 4,
  },
  addButton: {
    padding: 4,
  },
  userList: {
    marginTop: 8,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  userStatus: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  checkInButton: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  checkInButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default EventAttendancePage;
