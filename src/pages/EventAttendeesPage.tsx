import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Attendee {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role?: string;
}

const EventAttendeesPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  // Mock data for attendees
  const attendees: Attendee[] = [
    {
      id: 1,
      name: "Esther Smith",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      initials: "ES",
      role: "Host"
    },
    {
      id: 2,
      name: "Aparna Patel",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      initials: "AP",
      role: "Host"
    },
    {
      id: 3,
      name: "Hannah B",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      initials: "HB"
    },
    {
      id: 4,
      name: "Mooshoo Craddock",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      initials: "MC"
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      initials: "ET"
    }
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMessageAll = () => {
    // Logic to message all attendees would go here
    console.log("Messaging all attendees");
  };

  const handleMessageAttendee = (attendee: Attendee) => {
    // Logic to message specific attendee would go here
    console.log("Messaging attendee:", attendee.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Attendees</Text>
        <TouchableOpacity onPress={handleMessageAll} style={styles.messageAllButton}>
          <Icon name="message-square" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {attendees.map((attendee) => (
          <View key={attendee.id} style={styles.attendeeCard}>
            <View style={styles.attendeeInfo}>
              {attendee.avatar ? (
                <Image 
                  source={{ uri: attendee.avatar }} 
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>{attendee.initials}</Text>
                </View>
              )}
              <View style={styles.attendeeDetails}>
                <Text style={styles.attendeeName}>{attendee.name}</Text>
                {attendee.role && (
                  <Text style={styles.attendeeRole}>{attendee.role}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => handleMessageAttendee(attendee)}
              style={styles.messageButton}
            >
              <Icon name="message-square" size={20} color="#7C3AED" />
            </TouchableOpacity>
          </View>
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
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  messageAllButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  attendeeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  attendeeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E9D5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#7C3AED",
    fontWeight: "600",
  },
  attendeeDetails: {
    marginLeft: 12,
  },
  attendeeName: {
    fontSize: 16,
    fontWeight: "500",
  },
  attendeeRole: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  messageButton: {
    padding: 8,
  },
});

export default EventAttendeesPage;
