import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { format } from "date-fns";

interface EventFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: EventFilters) => void;
}

export interface EventFilters {
  eventTypes: string[];
  attendeeStatus: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  tags: string[];
}

const EventFilterSheet = ({ open, onOpenChange, onApplyFilters }: EventFilterSheetProps) => {
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [attendeeStatus, setAttendeeStatus] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Define filter options
  const eventTypeOptions = [
    { id: "sisterhood", label: "Sisterhood" },
    { id: "professional", label: "Professional" },
    { id: "fundraising", label: "Fundraising" },
    { id: "eoh", label: "EOH" },
    { id: "risk", label: "Risk" },
    { id: "historian", label: "Historian" },
  ];

  const tagOptions = [
    { id: "required", label: "Required" },
    { id: "optional", label: "Optional" },
    { id: "social", label: "Social" },
  ];

  const attendeeStatusOptions = [
    { id: "attending", label: "Attending" },
    { id: "not_attending", label: "Not Attending" },
    { id: "maybe", label: "Maybe" },
  ];

  const handleEventTypeChange = (type: string) => {
    setEventTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleTagChange = (tag: string) => {
    setTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAttendeeStatusChange = (status: string) => {
    setAttendeeStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleReset = () => {
    setEventTypes([]);
    setTags([]);
    setAttendeeStatus([]);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleApply = () => {
    onApplyFilters({
      eventTypes,
      attendeeStatus,
      startDate,
      endDate,
      tags,
    });
    onOpenChange(false);
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onOpenChange(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={() => onOpenChange(false)}>
              <Icon name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Types</Text>
              {eventTypeOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.option}
                  onPress={() => handleEventTypeChange(option.id)}
                >
                  <View style={[styles.checkbox, eventTypes.includes(option.id) && styles.checkboxChecked]}>
                    {eventTypes.includes(option.id) && (
                      <Icon name="check" size={16} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              {tagOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.option}
                  onPress={() => handleTagChange(option.id)}
                >
                  <View style={[styles.checkbox, tags.includes(option.id) && styles.checkboxChecked]}>
                    {tags.includes(option.id) && (
                      <Icon name="check" size={16} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Attendee Status</Text>
              {attendeeStatusOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.option}
                  onPress={() => handleAttendeeStatusChange(option.id)}
                >
                  <View style={[styles.checkbox, attendeeStatus.includes(option.id) && styles.checkboxChecked]}>
                    {attendeeStatus.includes(option.id) && (
                      <Icon name="check" size={16} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  optionLabel: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
  },
  resetButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#7C3AED",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
  },
});

export default EventFilterSheet;
