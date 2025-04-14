import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Requirement {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category: string;
  categoryColor: string;
}

const RequirementsPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [requirements] = useState<Requirement[]>([
    {
      id: "1",
      title: "Attend Chapter Meeting",
      description: "Must attend at least 2 chapter meetings this semester",
      dueDate: "May 1, 2024",
      completed: true,
      category: "Mandatory",
      categoryColor: "#7C3AED",
    },
    {
      id: "2",
      title: "Complete Service Hours",
      description: "Complete 10 hours of community service",
      dueDate: "April 15, 2024",
      completed: false,
      category: "Service",
      categoryColor: "#10B981",
    },
    {
      id: "3",
      title: "Attend Social Event",
      description: "Participate in at least one social event",
      dueDate: "March 30, 2024",
      completed: false,
      category: "Social",
      categoryColor: "#F59E0B",
    },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRequirementPress = (requirement: Requirement) => {
    navigation.navigate("RequirementDetails", { requirementId: requirement.id });
  };

  const completedCount = requirements.filter(r => r.completed).length;
  const totalCount = requirements.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Requirements</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(completedCount / totalCount) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>

        <View style={styles.requirementsList}>
          {requirements.map((requirement) => (
            <TouchableOpacity
              key={requirement.id}
              style={styles.requirementCard}
              onPress={() => handleRequirementPress(requirement)}
            >
              <View style={styles.requirementHeader}>
                <View style={styles.requirementTitleContainer}>
                  <Text style={styles.requirementTitle}>{requirement.title}</Text>
                  <View style={[styles.categoryTag, { backgroundColor: requirement.categoryColor }]}>
                    <Text style={styles.categoryText}>{requirement.category}</Text>
                  </View>
                </View>
                <Icon
                  name={requirement.completed ? "check-circle" : "circle"}
                  size={24}
                  color={requirement.completed ? "#10B981" : "#9CA3AF"}
                />
              </View>
              <Text style={styles.requirementDescription}>{requirement.description}</Text>
              <View style={styles.requirementFooter}>
                <Icon name="calendar" size={16} color="#6B7280" />
                <Text style={styles.dueDate}>Due {requirement.dueDate}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  progressSection: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7C3AED",
  },
  progressText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  requirementsList: {
    gap: 8,
  },
  requirementCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
  },
  requirementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  requirementTitleContainer: {
    flex: 1,
    marginRight: 8,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  requirementDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  requirementFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  dueDate: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
});

export default RequirementsPage;
