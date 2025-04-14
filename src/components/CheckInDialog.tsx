import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

interface CheckInDialogProps {
  visible: boolean;
  onClose: () => void;
  event: {
    title: string;
    date: Date;
    time: string;
    location: string;
    tag?: string;
    tagColor?: string;
  };
}

const CheckInDialog: React.FC<CheckInDialogProps> = ({
  visible,
  onClose,
  event,
}) => {
  const formattedDate = format(event.date, 'MMM d, yyyy');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <View style={styles.header}>
                <Text style={styles.title}>Check In</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="x" size={24} color="#000000" />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{formattedDate}</Text>

                <View style={styles.details}>
                  <View style={styles.detailRow}>
                    <Icon name="clock" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>{event.time}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="map-pin" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>{event.location}</Text>
                  </View>
                </View>

                {event.tag && (
                  <View style={[styles.tag, { backgroundColor: event.tagColor }]}>
                    <Text style={styles.tagText}>{event.tag}</Text>
                  </View>
                )}
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.checkInButton}
                  onPress={() => {
                    // Handle check in
                    onClose();
                  }}
                >
                  <Text style={styles.checkInText}>Check In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  content: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  details: {
    gap: 8,
    marginBottom: 12,
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
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  checkInButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CheckInDialog;
