import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  tag: string;
  tagColor: string;
  attendees: number;
}

const YourEvents = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for events
  const events: Event[] = [
    {
      id: 1,
      title: "Daily Standup Call",
      date: "Feb 16",
      time: "5:00-6:00PM",
      location: "Everitt Laboratory",
      tag: "Sisterhood",
      tagColor: "#7C3AED",
      attendees: 7,
    },
    {
      id: 2,
      title: "Professional Development Workshop",
      date: "Feb 18",
      time: "3:00-5:00PM",
      location: "Siebel Center",
      tag: "Professional",
      tagColor: "#3B82F6",
      attendees: 12,
    },
    {
      id: 3,
      title: "Social Mixer",
      date: "Feb 20",
      time: "6:00-8:00PM",
      location: "Illini Union",
      tag: "Social",
      tagColor: "#10B981",
      attendees: 15,
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCreateEvent = () => {
    navigation.navigate("CreateEvent");
  };

  const handleEventPress = (event: Event) => {
    navigation.navigate("EventDetails", { eventId: event.id.toString() });
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Events</Text>
        <TouchableOpacity onPress={handleCreateEvent} style={styles.addButton}>
          <Icon name="plus" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>
                {event.date} • {event.time}
              </Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
              <View style={styles.eventFooter}>
                <View style={[styles.eventTag, { backgroundColor: event.tagColor }]}>
                  <Text style={styles.tagText}>{event.tag}</Text>
                </View>
                <View style={styles.attendeesContainer}>
                  <Icon name="users" size={16} color="#6B7280" />
                  <Text style={styles.attendeesText}>{event.attendees} attending</Text>
                </View>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#6B7280" />
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
    alignItems: "center",
    justifyContent: "space-between",
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
  addButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
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
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  attendeesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  attendeesText: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default YourEvents;
