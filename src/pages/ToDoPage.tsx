import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  priorityColor: string;
  category?: string;
  categoryColor?: string;
  assignedBy?: string;
}

const ToDoPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: 1,
      title: "Turn in Dues",
      dueDate: "Tomorrow",
      priority: "High Importance",
      priorityColor: "#7C3AED",
    },
    {
      id: 2,
      title: "Contact Venue",
      dueDate: "Tomorrow",
      assignedBy: "Me",
      priority: "Officer Task",
      priorityColor: "#E9D5FF",
      category: "Risk",
      categoryColor: "#E9D5FF",
    },
    {
      id: 3,
      title: "Submit Event Proposal",
      dueDate: "Feb 20",
      priority: "Medium Importance",
      priorityColor: "#FCD34D",
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCreateTask = () => {
    navigation.navigate("CreateTask");
  };

  const handleTaskPress = (task: Task) => {
    navigation.navigate("TaskDetail", { taskId: task.id.toString() });
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>To-Do</Text>
        <TouchableOpacity onPress={handleCreateTask} style={styles.addButton}>
          <Icon name="plus" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => handleTaskPress(task)}
          >
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDueDate}>Due {task.dueDate}</Text>
              {task.assignedBy && (
                <Text style={styles.taskAssignedBy}>Assigned by: {task.assignedBy}</Text>
              )}
              <View style={styles.taskTags}>
                <View style={[styles.taskTag, { backgroundColor: task.priorityColor }]}>
                  <Text style={styles.tagText}>{task.priority}</Text>
                </View>
                {task.category && (
                  <View style={[styles.taskTag, { backgroundColor: task.categoryColor }]}>
                    <Text style={styles.tagText}>{task.category}</Text>
                  </View>
                )}
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>
        ))}
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
    alignItems: "center",
    justifyContent: "space-between",
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
  addButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  taskDueDate: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  taskAssignedBy: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  taskTags: {
    flexDirection: "row",
    gap: 8,
  },
  taskTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
});

export default ToDoPage;
