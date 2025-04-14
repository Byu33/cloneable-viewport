import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

const EventPreviewPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  
  // Use hardcoded event data when no state is provided
  const event = route.params?.event || {
    title: "Daily Standup Call",
    date: new Date("2024-02-16"),
    time: "5:00-6:00PM",
    location: "Everitt Laboratory",
    address: "1016 E Green St, Champaign IL",
    tag: "Sisterhood",
    tagColor: "#7C3AED",
    description: "Lorem Ipsum Blah por qua a fish jumped over the ocean and swam back to shore. Please join our event for a day of fun and games.",
    hosts: [
      { id: 1, name: "Aparna Patel", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
      { id: 2, name: "Mooshoo Craddock", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
    ]
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handlePublish = () => {
    // Save the event to storage
    // saveEvent(event);
    
    Alert.alert(
      "Success",
      "Your event has been created successfully! Now others can view and register for your event.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("YourEvents")
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("YourEvents")}
          style={styles.closeButton}
        >
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.tagContainer}>
            <Text style={[styles.tag, { color: event.tagColor }]}>
              {event.tag}
            </Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Icon name="calendar" size={20} color="#6B7280" />
              <Text style={styles.infoText}>
                {formatDate(event.date)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="clock" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="map-pin" size={20} color="#6B7280" />
              <View>
                <Text style={styles.infoText}>{event.location}</Text>
                <Text style={styles.addressText}>{event.address}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{event.description}</Text>

          <Text style={styles.sectionTitle}>Hosts</Text>
          <View style={styles.hostsContainer}>
            {event.hosts.map((host) => (
              <View key={host.id} style={styles.hostItem}>
                <Image 
                  source={{ uri: host.avatar }} 
                  style={styles.hostAvatar}
                />
                <Text style={styles.hostName}>{host.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <Text style={styles.publishButtonText}>Publish Event</Text>
        </TouchableOpacity>
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
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
  },
  tagContainer: {
    marginBottom: 16,
  },
  tag: {
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#374151",
  },
  addressText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 24,
    lineHeight: 24,
  },
  hostsContainer: {
    marginBottom: 24,
  },
  hostItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  hostName: {
    fontSize: 16,
    color: "#374151",
  },
  publishButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  publishButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EventPreviewPage;
