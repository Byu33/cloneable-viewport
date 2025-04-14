import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import EventCard from '@/components/EventCard';
import TabBar from '@/components/TabBar';
import CalendarView from '@/components/CalendarView';
import CheckInDialog from '@/components/CheckInDialog';
import { NavigationProp } from '@/types/navigation';

type IconName = keyof typeof Feather.glyphMap;

const Index = () => {
  const [activeTab, setActiveTab] = useState('Going');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const tabs = ['Going', 'Explore', 'Your Events'];
  const navigation = useNavigation<NavigationProp>();

  const handleTabClick = (tab: string) => {
    if (tab === 'Explore') {
      navigation.navigate('Explore' as keyof NavigationProp['navigate']);
    } else if (tab === 'Your Events') {
      navigation.navigate('YourEvents' as keyof NavigationProp['navigate']);
    } else {
      setActiveTab(tab);
    }
  };

  const handleCheckIn = (event: any) => {
    setSelectedEvent(event);
    setIsCheckInOpen(true);
  };

  const handleCalendarClick = () => {
    navigation.navigate('Calendar' as keyof NavigationProp['navigate']);
  };

  const handleProfileClick = () => {
    navigation.navigate('Profile' as keyof NavigationProp['navigate']);
  };

  const handleNotificationsClick = () => {
    navigation.navigate('Notifications' as keyof NavigationProp['navigate']);
  };

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Chapter Meeting',
      time: '5:00-6:00PM',
      location: 'Everitt Labratory',
      tag: 'Required',
      tagColor: 'purple',
      date: new Date(),
      status: 'upcoming' as const,
    },
    {
      id: 2,
      title: 'Daily Standup Call',
      time: '5:00-6:00PM',
      location: 'Everitt Labratory',
      tag: 'Sisterhood',
      tagColor: 'purple',
      attendees: 7,
      date: new Date(),
      status: 'upcoming' as const,
    },
  ];

  const pastEvents = [
    {
      id: 3,
      title: 'Decorating Cakes',
      time: '5:00-6:00PM',
      location: 'Everitt Labratory',
      date: new Date('2024-02-16'),
      tag: 'Risk',
      tagColor: 'purple',
      status: 'past' as const,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleNotificationsClick}
          >
            <Feather name="bell" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleCalendarClick}
          >
            <Feather name="calendar" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleProfileClick}
          >
            <Feather name="user" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => handleTabClick(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Calendar Section */}
        <View style={styles.section}>
          <CalendarView
            isExpanded={isCalendarExpanded}
            title="Upcoming Events"
            onToggleExpand={() => setIsCalendarExpanded(!isCalendarExpanded)}
          />

          {/* Event Cards */}
          <View style={styles.eventCards}>
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onCheckIn={() => handleCheckIn(event)}
                source="going"
              />
            ))}
          </View>
        </View>

        {/* Past Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          <View style={styles.eventCards}>
            {pastEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                source="past"
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Check In Dialog */}
      {selectedEvent && (
        <CheckInDialog
          visible={isCheckInOpen}
          onClose={() => setIsCheckInOpen(false)}
          event={{
            title: selectedEvent.title,
            date: selectedEvent.date,
            time: selectedEvent.time,
            location: selectedEvent.location,
            tag: selectedEvent.tag,
            tagColor: selectedEvent.tagColor,
          }}
        />
      )}

      {/* Bottom Tab Bar */}
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BigShoulders',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  eventCards: {
    gap: 16,
  },
});

export default Index;
