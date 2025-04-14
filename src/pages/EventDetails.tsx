import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

type EventDetailsParams = {
  source?: string;
  eventId?: string;
};

const EventDetails = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as EventDetailsParams;
  
  const isAlreadyAttending = params?.source === "going";
  const isYourEvent = params?.source === "your-events";
  
  const event = {
    id: 1,
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
    ],
    attendees: [
      { id: 1, name: "Esther Smith", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
      { id: 2, name: "Aparna Patel", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
      { id: 3, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
      { id: 4, name: "Mooshoo Craddock", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
    ]
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleCancelAttendance = () => {
    Alert.alert(
      "Attendance Cancelled",
      "You are no longer attending this event",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home")
        }
      ]
    );
  };

  const handleSignUp = () => {
    Alert.alert(
      "Success",
      "You have successfully signed up for this event!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home")
        }
      ]
    );
  };

  const handleViewAttendees = () => {
    navigation.navigate("EventAttendees", { eventId: event.id.toString() });
  };

  const handleMessageAttendees = () => {
    // Logic to message attendees would go here
    console.log("Messaging attendees");
  };

  const handleEditEvent = () => {
    navigation.navigate("EditEvent", { eventId: event.id.toString() });
  };

  const handleCancelEvent = () => {
    Alert.alert(
      "Cancel Event",
      "Are you sure you want to cancel this event? This action cannot be undone.",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes, Cancel Event",
          style: "destructive",
          onPress: () => {
            // Logic to cancel event would go here
            console.log("Cancelling event");
            navigation.navigate("YourEvents");
          }
        }
      ]
    );
  };

  const handleShare = () => {
    // Logic to share event would go here
    console.log("Sharing event");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Icon name="share-2" size={24} color="#7C3AED" />
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

          <Text style={styles.sectionTitle}>Attendees</Text>
          <View style={styles.attendeesContainer}>
            {event.attendees.map((attendee) => (
              <View key={attendee.id} style={styles.attendeeItem}>
                <Image 
                  source={{ uri: attendee.avatar }} 
                  style={styles.attendeeAvatar}
                />
                <Text style={styles.attendeeName}>{attendee.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          {isYourEvent ? (
            <>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditEvent}
              >
                <Icon name="edit" size={20} color="#FFFFFF" />
                <Text style={styles.editButtonText}>Edit Event</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancelEvent}
              >
                <Icon name="x" size={20} color="#FFFFFF" />
                <Text style={styles.cancelButtonText}>Cancel Event</Text>
              </TouchableOpacity>
            </>
          ) : isAlreadyAttending ? (
            <TouchableOpacity 
              style={styles.cancelAttendanceButton}
              onPress={handleCancelAttendance}
            >
              <Icon name="x" size={20} color="#FFFFFF" />
              <Text style={styles.cancelAttendanceButtonText}>Cancel Attendance</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Icon name="check" size={20} color="#FFFFFF" />
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.viewAttendeesButton}
            onPress={handleViewAttendees}
          >
            <Icon name="users" size={20} color="#7C3AED" />
            <Text style={styles.viewAttendeesButtonText}>View Attendees</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={handleMessageAttendees}
          >
            <Icon name="message-square" size={20} color="#7C3AED" />
            <Text style={styles.messageButtonText}>Message Attendees</Text>
          </TouchableOpacity>
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
  shareButton: {
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
  attendeesContainer: {
    marginBottom: 24,
  },
  attendeeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  attendeeName: {
    fontSize: 16,
    color: "#374151",
  },
  actionButtons: {
    marginBottom: 32,
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  cancelAttendanceButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cancelAttendanceButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  signUpButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  viewAttendeesButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#7C3AED",
  },
  viewAttendeesButtonText: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  messageButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#7C3AED",
  },
  messageButtonText: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default EventDetails;
