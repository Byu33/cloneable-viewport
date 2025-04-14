import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Member {
  id: number;
  name: string;
  position?: string;
  graduationYear?: string;
  avatarUrl?: string;
  avatarFallback: string;
  pledgeClass?: string;
}

const MembersPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const members: Member[] = [
    {
      id: 1,
      name: "Bella Yu",
      position: "Marketing VP",
      graduationYear: "2024",
      avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      avatarFallback: "BY",
      pledgeClass: "Sigma '21"
    },
    {
      id: 2,
      name: "Emma Thompson",
      position: "President",
      graduationYear: "2024",
      avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
      avatarFallback: "ET",
      pledgeClass: "Sigma '21"
    },
    {
      id: 3,
      name: "Sophia Martinez",
      position: "Treasurer",
      graduationYear: "2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
      avatarFallback: "SM",
      pledgeClass: "Sigma '22"
    },
    {
      id: 4,
      name: "Olivia Wilson",
      position: "Secretary",
      graduationYear: "2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      avatarFallback: "OW",
      pledgeClass: "Sigma '22"
    },
    {
      id: 5,
      name: "Ava Anderson",
      position: "Social Chair",
      graduationYear: "2024",
      avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      avatarFallback: "AA",
      pledgeClass: "Sigma '21"
    }
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMemberClick = (memberId: number) => {
    navigation.navigate("MemberProfile", { memberId: memberId.toString() });
  };

  const handleFilter = () => {
    // Logic to handle filtering would go here
    console.log("Filter clicked");
  };

  const handleAddMember = () => {
    navigation.navigate("AddMember");
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.pledgeClass?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Members</Text>
        <TouchableOpacity onPress={handleAddMember} style={styles.addButton}>
          <Icon name="plus" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
          <Icon name="filter" size={20} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.membersList}>
        {filteredMembers.map((member) => (
          <TouchableOpacity
            key={member.id}
            style={styles.memberCard}
            onPress={() => handleMemberClick(member.id)}
          >
            <View style={styles.memberInfo}>
              {member.avatarUrl ? (
                <Image
                  source={{ uri: member.avatarUrl }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>
                    {member.avatarFallback}
                  </Text>
                </View>
              )}
              <View style={styles.memberDetails}>
                <Text style={styles.memberName}>{member.name}</Text>
                {member.position && (
                  <Text style={styles.memberPosition}>{member.position}</Text>
                )}
                {member.pledgeClass && (
                  <Text style={styles.memberPledgeClass}>{member.pledgeClass}</Text>
                )}
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#6B7280" />
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
  addButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  membersList: {
    flex: 1,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarFallbackText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  memberPosition: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  memberPledgeClass: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default MembersPage;
