import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { format } from "date-fns";
import { NavigationProp } from "@/types/navigation";

const categories = [
  { id: "social", name: "Social", color: "#7C3AED" },
  { id: "professional", name: "Professional", color: "#7C3AED" },
  { id: "fundraising", name: "Fundraising", color: "#7C3AED" },
  { id: "risk", name: "Risk", color: "#7C3AED" },
  { id: "sisterhood", name: "Sisterhood", color: "#7C3AED" },
];

// Mock data for members
const individualMembers = [
  { id: "1", name: "Jane Doe", avatar: "JD" },
  { id: "2", name: "John Smith", avatar: "JS" },
  { id: "3", name: "Alice Johnson", avatar: "AJ" },
];

const CreateEventPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [restrictAttendance, setRestrictAttendance] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [attendeeGroups, setAttendeeGroups] = useState({
    allMembers: false,
    allCandidates: false,
    allOfficers: false,
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [requiredForGroups, setRequiredForGroups] = useState({
    allMembers: false,
    allCandidates: false,
    allOfficers: false,
  });
  const [requiredMembers, setRequiredMembers] = useState<string[]>([]);

  const handleCategorySelect = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleNextClick = () => {
    navigation.navigate("CreateEventDetails");
  };

  const toggleMemberSelection = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleGroupChange = (group: keyof typeof attendeeGroups) => {
    setAttendeeGroups({
      ...attendeeGroups,
      [group]: !attendeeGroups[group],
    });
  };

  const handleGroupSelect = (groupId: string) => {
    // Handle group selection
  };

  const toggleRequiredMemberSelection = (id: string) => {
    if (requiredMembers.includes(id)) {
      setRequiredMembers(requiredMembers.filter(memberId => memberId !== id));
    } else {
      setRequiredMembers([...requiredMembers, id]);
    }
  };

  const handleRequiredGroupChange = (group: keyof typeof requiredForGroups) => {
    setRequiredForGroups({
      ...requiredForGroups,
      [group]: !requiredForGroups[group],
    });
  };

  const handleRequiredGroupSelect = (groupId: string) => {
    // Handle required group selection
  };

  const renderMemberItem = (
    member: typeof individualMembers[0], 
    toggleMemberSelection: (id: string) => void, 
    selectedMembers: string[]
  ) => (
    <TouchableOpacity
      key={member.id}
      style={styles.memberItem}
      onPress={() => toggleMemberSelection(member.id)}
    >
      <View style={styles.memberAvatar}>
        <Text style={styles.avatarText}>{member.avatar}</Text>
      </View>
      <Text style={styles.memberName}>{member.name}</Text>
      {selectedMembers.includes(member.id) && (
        <Icon name="check" size={20} color="#7C3AED" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            placeholderTextColor="#9CA3AF"
          />
          
          <View style={styles.dateContainer}>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => {/* Open date picker */}}
            >
              <Icon name="calendar" size={20} color="#6B7280" />
              <Text style={styles.dateText}>
                {date ? format(date, "MMMM d, yyyy") : "Select Date"}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#9CA3AF"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category.name) && 
                    { backgroundColor: category.color }
                ]}
                onPress={() => handleCategorySelect(category.name)}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategories.includes(category.name) && 
                      { color: "#FFFFFF" }
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Restrict Attendance</Text>
            <Switch
              value={restrictAttendance}
              onValueChange={setRestrictAttendance}
              trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          {restrictAttendance && (
            <>
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>All Members</Text>
                <Switch
                  value={attendeeGroups.allMembers}
                  onValueChange={() => handleGroupChange("allMembers")}
                  trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>All Candidates</Text>
                <Switch
                  value={attendeeGroups.allCandidates}
                  onValueChange={() => handleGroupChange("allCandidates")}
                  trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>All Officers</Text>
                <Switch
                  value={attendeeGroups.allOfficers}
                  onValueChange={() => handleGroupChange("allOfficers")}
                  trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <TextInput
                style={styles.searchInput}
                placeholder="Search members..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              
              <View style={styles.membersList}>
                {individualMembers.map(member => 
                  renderMemberItem(member, toggleMemberSelection, selectedMembers)
                )}
              </View>
            </>
          )}
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Required Event</Text>
            <Switch
              value={isRequired}
              onValueChange={setIsRequired}
              trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          {isRequired && (
            <>
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>Required for All Members</Text>
                <Switch
                  value={requiredForGroups.allMembers}
                  onValueChange={() => handleRequiredGroupChange("allMembers")}
                  trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>Required for All Candidates</Text>
                <Switch
                  value={requiredForGroups.allCandidates}
                  onValueChange={() => handleRequiredGroupChange("allCandidates")}
                  trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>Required for All Officers</Text>
                <Switch
                  value={requiredForGroups.allOfficers}
                  onValueChange={() => handleRequiredGroupChange("allOfficers")}
                  trackColor={{ false: "#E5E7EB", true: "#7C3AED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.membersList}>
                {individualMembers.map(member => 
                  renderMemberItem(member, toggleRequiredMemberSelection, requiredMembers)
                )}
              </View>
            </>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNextClick}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#6B7280",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  groupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  membersList: {
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  memberAvatar: {
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
  memberName: {
    flex: 1,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateEventPage;
