import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Member {
  id: number;
  name: string;
  avatar?: string;
  role?: string;
  selected?: boolean;
}

interface MemberSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMembersSelected: (members: Member[]) => void;
  selectedMembers?: Member[];
  title?: string;
}

const MemberSearchModal = ({
  open,
  onOpenChange,
  onMembersSelected,
  selectedMembers = [],
  title = "Add Assignees"
}: MemberSearchModalProps) => {
  // Mock data for members
  const allMembers: Member[] = [
    { id: 1, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", role: "President" },
    { id: 2, name: "Aparna P", avatar: "https://randomuser.me/api/portraits/women/32.jpg", role: "Vice President" },
    { id: 3, name: "Esther S", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 4, name: "Mooshoo C", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 5, name: "Lisa R", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
    { id: 6, name: "Jennifer K", avatar: "https://randomuser.me/api/portraits/women/76.jpg", role: "Secretary" },
    { id: 7, name: "Maya L", avatar: "https://randomuser.me/api/portraits/women/89.jpg" },
    { id: 8, name: "Taylor S", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: 9, name: "Emma W", avatar: "https://randomuser.me/api/portraits/women/24.jpg", role: "Treasurer" },
    { id: 10, name: "Sophie T", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedMembersList, setSelectedMembersList] = useState<Member[]>(selectedMembers);

  useEffect(() => {
    const filtered = allMembers.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredMembers(filtered);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const toggleMember = (member: Member) => {
    setSelectedMembersList(prev => {
      const isSelected = prev.some(m => m.id === member.id);
      if (isSelected) {
        return prev.filter(m => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleDone = () => {
    onMembersSelected(selectedMembersList);
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
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => onOpenChange(false)}>
              <Icon name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search members..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          <ScrollView style={styles.membersList}>
            {filteredMembers.map(member => (
              <TouchableOpacity
                key={member.id}
                style={styles.memberItem}
                onPress={() => toggleMember(member)}
              >
                <View style={styles.memberInfo}>
                  {member.avatar ? (
                    <Image source={{ uri: member.avatar }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </Text>
                    </View>
                  )}
                  <View style={styles.memberDetails}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    {member.role && (
                      <Text style={styles.memberRole}>{member.role}</Text>
                    )}
                  </View>
                </View>
                <View style={[styles.checkbox, selectedMembersList.some(m => m.id === member.id) && styles.checkboxChecked]}>
                  {selectedMembersList.some(m => m.id === member.id) && (
                    <Icon name="check" size={16} color="#FFF" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
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
  modalContent: {
    backgroundColor: "#FFFFFF",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  membersList: {
    padding: 16,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  memberDetails: {
    marginLeft: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "500",
  },
  memberRole: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  doneButton: {
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MemberSearchModal;
