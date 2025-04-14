import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Switch, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";
import MemberSearchModal from "@/components/MemberSearchModal";

interface Member {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role?: string;
  selected?: boolean;
}

const CreateTaskPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [assignees, setAssignees] = useState<Member[]>([]);
  const [isMemberSearchOpen, setIsMemberSearchOpen] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCreateTask = () => {
    if (!taskName) {
      Alert.alert(
        "Task name required",
        "Please enter a name for the task",
        [{ text: "OK" }]
      );
      return;
    }

    // Logic to create task would go here
    console.log({
      taskName,
      taskDescription,
      dueDate,
      isRequired,
      assignees
    });
    
    // Navigate back after creating task
    navigation.goBack();
  };

  const handleAssigneeSelection = (selectedMembers: Member[]) => {
    setAssignees(selectedMembers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Task</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            value={taskName}
            onChangeText={setTaskName}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter task description"
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => {/* Open date picker */}}
          >
            <Icon name="calendar" size={20} color="#6B7280" />
            <Text style={styles.dateText}>
              {dueDate || "Select due date"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Required Task</Text>
            <Switch
              value={isRequired}
              onValueChange={setIsRequired}
              trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Assignees</Text>
          <TouchableOpacity 
            style={styles.assigneesButton}
            onPress={() => setIsMemberSearchOpen(true)}
          >
            <Icon name="users" size={20} color="#6B7280" />
            <Text style={styles.assigneesText}>
              {assignees.length > 0 
                ? `${assignees.length} member${assignees.length !== 1 ? 's' : ''} selected` 
                : "Select members"}
            </Text>
          </TouchableOpacity>
          
          {assignees.length > 0 && (
            <View style={styles.assigneesList}>
              {assignees.map(member => (
                <View key={member.id} style={styles.assigneeItem}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{member.initials}</Text>
                  </View>
                  <Text style={styles.assigneeName}>{member.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </ScrollView>

      <MemberSearchModal 
        open={isMemberSearchOpen}
        onOpenChange={setIsMemberSearchOpen}
        onMembersSelected={handleAssigneeSelection}
        selectedMembers={assignees}
      />
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
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#6B7280",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  assigneesButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  assigneesText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#6B7280",
  },
  assigneesList: {
    marginTop: 12,
  },
  assigneeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E9D5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#7C3AED",
    fontWeight: "600",
  },
  assigneeName: {
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateTaskPage;
