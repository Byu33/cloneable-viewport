import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: number;
  isPrivate: boolean;
}

const EditEventPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const eventId = (route.params as { eventId: number })?.eventId;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [notifyAttendees, setNotifyAttendees] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const [event, setEvent] = useState<Event>({
    id: eventId,
    title: "Spring Social Mixer",
    description: "Join us for a fun evening of networking and socializing with fellow members!",
    date: "2024-03-15",
    time: "18:00",
    location: "Student Center Ballroom",
    category: "Social",
    maxAttendees: 50,
    isPrivate: false,
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Logic to save event changes would go here
    console.log("Saving event changes:", event);
    navigation.goBack();
  };

  const handleDelete = () => {
    // Logic to delete event would go here
    console.log("Deleting event:", eventId);
    navigation.goBack();
  };

  const handleInputChange = (field: keyof Event, value: string | number | boolean) => {
    setEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (cancelReason.trim() === "") {
      Alert.alert("Error", "Please provide a reason for cancellation");
      return;
    }
    
    // Logic to cancel event would go here
    console.log("Cancelling event with reason:", cancelReason);
    navigation.goBack();
  };

  const handleNextTab = () => {
    if (activeTab === "details") {
      setActiveTab("attendance");
    } else if (activeTab === "attendance") {
      setActiveTab("logistics");
    }
  };

  const handlePreviousTab = () => {
    if (activeTab === "logistics") {
      setActiveTab("attendance");
    } else if (activeTab === "attendance") {
      setActiveTab("details");
    }
  };

  const renderDetailsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Title</Text>
        <TextInput
          style={styles.input}
          value={event.title}
          onChangeText={(value) => handleInputChange("title", value)}
          placeholder="Enter event title"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={event.description}
          onChangeText={(value) => handleInputChange("description", value)}
          placeholder="Enter event description"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={event.date}
            onChangeText={(value) => handleInputChange("date", value)}
            placeholder="YYYY-MM-DD"
          />
        </View>
        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            value={event.time}
            onChangeText={(value) => handleInputChange("time", value)}
            placeholder="HH:MM"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={event.location}
          onChangeText={(value) => handleInputChange("location", value)}
          placeholder="Enter event location"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={event.category}
          onChangeText={(value) => handleInputChange("category", value)}
          placeholder="Enter event category"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Maximum Attendees</Text>
        <TextInput
          style={styles.input}
          value={event.maxAttendees.toString()}
          onChangeText={(value) => handleInputChange("maxAttendees", parseInt(value) || 0)}
          placeholder="Enter maximum number of attendees"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Private Event</Text>
          <TouchableOpacity
            style={[styles.switch, event.isPrivate && styles.switchActive]}
            onPress={() => handleInputChange("isPrivate", !event.isPrivate)}
          >
            <View style={[styles.switchKnob, event.isPrivate && styles.switchKnobActive]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderAttendanceTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Attendance Settings</Text>
      <Text style={styles.tabDescription}>
        Configure who can attend this event and who is required to attend.
      </Text>
      
      {/* Attendance settings would go here */}
    </View>
  );

  const renderLogisticsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Event Logistics</Text>
      <Text style={styles.tabDescription}>
        Set up logistics details for the event.
      </Text>
      
      {/* Logistics settings would go here */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Event</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "details" && styles.activeTab]}
          onPress={() => setActiveTab("details")}
        >
          <Text style={[styles.tabText, activeTab === "details" && styles.activeTabText]}>
            Details
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === "attendance" && styles.activeTab]}
          onPress={() => setActiveTab("attendance")}
        >
          <Text style={[styles.tabText, activeTab === "attendance" && styles.activeTabText]}>
            Attendance
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === "logistics" && styles.activeTab]}
          onPress={() => setActiveTab("logistics")}
        >
          <Text style={[styles.tabText, activeTab === "logistics" && styles.activeTabText]}>
            Logistics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "attendance" && renderAttendanceTab()}
        {activeTab === "logistics" && renderLogisticsTab()}
        
        <View style={styles.buttonContainer}>
          {activeTab !== "details" && (
            <TouchableOpacity 
              style={styles.previousButton}
              onPress={handlePreviousTab}
            >
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {activeTab !== "logistics" ? (
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNextTab}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Icon name="trash-2" size={20} color="#EF4444" style={styles.deleteIcon} />
          <Text style={styles.deleteButtonText}>Delete Event</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancel}
        >
          <Icon name="trash-2" size={20} color="#EF4444" />
          <Text style={styles.cancelButtonText}>Cancel Event</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isDialogOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDialogOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Event</Text>
            <Text style={styles.modalDescription}>
              Are you sure you want to cancel this event? This action cannot be undone.
            </Text>
            
            <Text style={styles.modalLabel}>Reason for Cancellation</Text>
            <TextInput
              style={styles.modalInput}
              value={cancelReason}
              onChangeText={setCancelReason}
              placeholder="Enter reason for cancellation"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
            
            <View style={styles.modalSwitchContainer}>
              <Text style={styles.modalSwitchLabel}>Notify Attendees</Text>
              <TouchableOpacity
                onPress={() => setNotifyAttendees(!notifyAttendees)}
                style={styles.modalSwitch}
              >
                <View style={[
                  styles.modalSwitchTrack,
                  notifyAttendees && { backgroundColor: "#7C3AED" }
                ]}>
                  {notifyAttendees && (
                    <View style={styles.modalSwitchThumb} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setIsDialogOpen(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalConfirmButton}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  saveButton: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#7C3AED",
  },
  tabText: {
    color: "#6B7280",
    fontSize: 16,
  },
  activeTabText: {
    color: "#7C3AED",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tabContent: {
    marginBottom: 24,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  tabDescription: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switch: {
    width: 48,
    height: 24,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    padding: 2,
  },
  switchActive: {
    backgroundColor: "#7C3AED",
  },
  switchKnob: {
    width: 20,
    height: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  switchKnobActive: {
    transform: [{ translateX: 24 }],
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  previousButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7C3AED",
    marginRight: 8,
  },
  previousButtonText: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginLeft: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  deleteIcon: {
    marginRight: 8,
  },
  deleteButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 32,
  },
  cancelButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#374151",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    height: 100,
    textAlignVertical: "top",
  },
  modalSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalSwitchLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalSwitch: {
    width: 50,
    height: 30,
  },
  modalSwitchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
  },
  modalSwitchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    right: 2,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  modalCancelButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginLeft: 8,
  },
  modalConfirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditEventPage;
