import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    time: string;
    location: string;
    tag?: string;
    tagColor?: string;
    date: Date;
    status: 'upcoming' | 'past';
    attendees?: number;
  };
  onCheckIn?: () => void;
  source: 'going' | 'past';
}

const EventCard: React.FC<EventCardProps> = ({ event, onCheckIn, source }) => {
  const formattedDate = format(event.date, 'MMM d, yyyy');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // Navigate to event details
      }}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{event.title}</Text>
          {event.tag && (
            <View style={[styles.tag, { backgroundColor: event.tagColor }]}>
              <Text style={styles.tagText}>{event.tag}</Text>
            </View>
          )}
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Icon name="clock" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{event.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="map-pin" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
        {event.attendees !== undefined && (
          <View style={styles.detailRow}>
            <Icon name="users" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{event.attendees} attending</Text>
          </View>
        )}
      </View>

      {source === 'going' && onCheckIn && (
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={onCheckIn}
        >
          <Text style={styles.checkInText}>Check In</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  checkInButton: {
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  checkInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default EventCard;
