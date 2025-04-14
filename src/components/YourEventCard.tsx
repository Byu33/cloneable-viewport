import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { NavigationProp } from "@/types/navigation";
import { Event } from "@/utils/eventStorage";

type IconName = keyof typeof Feather.glyphMap;

interface YourEventCardProps {
  event: Event;
  index: number;
}

const YourEventCard = ({ event, index }: YourEventCardProps) => {
  const navigation = useNavigation<NavigationProp>();

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleEventClick = (eventId: number) => {
    navigation.navigate("EventDetails", { eventId: eventId.toString(), source: "your-events" });
  };

  const handleAttendance = (eventId: number) => {
    navigation.navigate("EventAttendance", { eventId: eventId.toString() });
  };

  const handleEditEvent = (eventId: number) => {
    navigation.navigate("EditEvent", { eventId: eventId.toString() });
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleEventClick(event.id)}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.dateTime}>
            <Text style={styles.date}>{formatDate(event.date)}</Text> {event.time}
          </Text>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={16} color="#6B7280" />
            <Text style={styles.location}>{event.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleAttendance(event.id)}
        >
          <Feather name="users" size={16} color="#7C3AED" />
          <Text style={styles.buttonText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleEditEvent(event.id)}
        >
          <Feather name="edit-2" size={16} color="#7C3AED" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1F2C",
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  date: {
    fontWeight: "600",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  buttonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#7C3AED",
  },
});

export default YourEventCard;
