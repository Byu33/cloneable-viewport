import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface EventFilters {
  eventTypes: string[];
  tags: string[];
  attendeeStatus: string[];
  startDate?: Date;
  endDate?: Date;
}

const Explore = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const tabs = ["Going", "Explore", "Your Events"];
  const navigation = useNavigation<NavigationProp>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<EventFilters>({
    eventTypes: [],
    tags: [],
    attendeeStatus: [],
    startDate: undefined,
    endDate: undefined
  });

  const handleTabClick = (tab: string) => {
    if (tab === "Going") {
      navigation.navigate("Home");
    } else if (tab === "Your Events") {
      navigation.navigate("YourEvents");
    } else {
      setActiveTab(tab);
    }
  };
  
  const handleCalendarClick = () => {
    navigation.navigate("Calendar");
  };
  
  const handleProfileClick = () => {
    navigation.navigate("Profile");
  };
  
  const handleNotificationsClick = () => {
    navigation.navigate("Notifications");
  };
  
  const handleFilter = () => {
    setIsFilterOpen(true);
  };
  
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };
  
  const handleApplyFilters = (filters: EventFilters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Chapter Meeting",
      date: new Date("2024-02-16"),
      time: "5:00-6:00PM",
      location: "Everitt Laboratory",
      tag: "Sisterhood",
      tagColor: "#7C3AED",
      attendees: 12,
      maxAttendees: 20
    },
    {
      id: 2,
      title: "Professional Development Workshop",
      date: new Date("2024-02-20"),
      time: "3:00-5:00PM",
      location: "Siebel Center",
      tag: "Professional",
      tagColor: "#3B82F6",
      attendees: 8,
      maxAttendees: 15
    }
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => handleTabClick(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleCalendarClick} style={styles.headerButton}>
            <Icon name="calendar" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotificationsClick} style={styles.headerButton}>
            <Icon name="bell" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick} style={styles.headerButton}>
            <Icon name="user" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events"
            value={searchTerm}
            onChangeText={handleSearchChange}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
          <Icon name="filter" size={20} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {events.map((event) => (
          <TouchableOpacity 
            key={event.id}
            style={styles.eventCard}
            onPress={() => navigation.navigate("EventDetails", { eventId: event.id.toString() })}
          >
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={[styles.tag, { backgroundColor: `${event.tagColor}20` }]}>
                <Text style={[styles.tagText, { color: event.tagColor }]}>
                  {event.tag}
                </Text>
              </View>
            </View>

            <View style={styles.eventInfo}>
              <View style={styles.infoRow}>
                <Icon name="calendar" size={16} color="#6B7280" />
                <Text style={styles.infoText}>
                  {formatDate(event.date)} • {event.time}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="map-pin" size={16} color="#6B7280" />
                <Text style={styles.infoText}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.eventFooter}>
              <View style={styles.attendeesContainer}>
                <Icon name="users" size={16} color="#6B7280" />
                <Text style={styles.attendeesText}>
                  {event.attendees}/{event.maxAttendees} attendees
                </Text>
              </View>
              <TouchableOpacity style={styles.rsvpButton}>
                <Text style={styles.rsvpButtonText}>RSVP</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={isFilterOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Events</Text>
              <TouchableOpacity 
                onPress={() => setIsFilterOpen(false)}
                style={styles.closeButton}
              >
                <Icon name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Filter options would go here */}
            <View style={styles.filterOptions}>
              <Text style={styles.filterSectionTitle}>Event Types</Text>
              {/* Event type options */}

              <Text style={styles.filterSectionTitle}>Tags</Text>
              {/* Tag options */}

              <Text style={styles.filterSectionTitle}>Date Range</Text>
              {/* Date range picker */}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => setActiveFilters({
                  eventTypes: [],
                  tags: [],
                  attendeeStatus: [],
                  startDate: undefined,
                  endDate: undefined
                })}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => handleApplyFilters(activeFilters)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingBottom: 8,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#7C3AED",
  },
  tabText: {
    fontSize: 16,
    color: "#6B7280",
  },
  activeTabText: {
    color: "#7C3AED",
    fontWeight: "500",
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
  eventInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendeesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendeesText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  rsvpButton: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rsvpButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  filterOptions: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    color: "#374151",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginRight: 8,
  },
  resetButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#7C3AED",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Explore;
