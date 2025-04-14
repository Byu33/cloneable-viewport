import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface ExploreEventCardProps {
  event: {
    id: number;
    title: string;
    time: string;
    location: string;
    tag?: string;
    tagColor?: string;
    attendees?: number;
    date: Date;
    status: "upcoming" | "past";
  };
}

const ExploreEventCard: React.FC<ExploreEventCardProps> = ({ event }) => {
  const { id, title, time, location, tag, tagColor, attendees, date } = event;
  const navigation = useNavigation<NavigationProp>();

  // Format date
  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleClick = () => {
    navigation.navigate("EventDetails", { eventId: id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleClick}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.dateTime}>
              {formatDate(date)} {time}
            </Text>
            <View style={styles.locationContainer}>
              <Icon name="map-pin" size={16} color="#6B7280" />
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>
          {tag && (
            <View style={[styles.tag, { backgroundColor: tagColor || "#7C3AED" }]}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          )}
        </View>

        {attendees !== undefined && (
          <View style={styles.footer}>
            <Text style={styles.attendees}>{attendees} attendees</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  attendees: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default ExploreEventCard;
