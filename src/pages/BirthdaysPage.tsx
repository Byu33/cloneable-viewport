import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

interface Birthday {
  id: number;
  name: string;
  date: string;
  avatar: string;
  age: number;
  position: string;
}

const BirthdaysPage = () => {
  const navigation = useNavigation<NavigationProp>();

  // Mock data for birthdays
  const birthdays: Birthday[] = [
    {
      id: 1,
      name: "Hannah B",
      date: "Feb 16",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      age: 21,
      position: "President",
    },
    {
      id: 2,
      name: "Aparna P",
      date: "Feb 18",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      age: 20,
      position: "Vice President",
    },
    {
      id: 3,
      name: "Esther S",
      date: "Feb 20",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      age: 22,
      position: "Treasurer",
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = (memberId: number) => {
    navigation.navigate("MemberProfile", { memberId: memberId.toString() });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Birthdays</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Month</Text>
          {birthdays.map((birthday) => (
            <TouchableOpacity
              key={birthday.id}
              style={styles.birthdayCard}
              onPress={() => handleProfilePress(birthday.id)}
            >
              <Image source={{ uri: birthday.avatar }} style={styles.avatar} />
              <View style={styles.birthdayInfo}>
                <Text style={styles.name}>{birthday.name}</Text>
                <Text style={styles.position}>{birthday.position}</Text>
                <View style={styles.dateContainer}>
                  <Icon name="calendar" size={16} color="#6B7280" />
                  <Text style={styles.date}>{birthday.date}</Text>
                  <Text style={styles.age}>• Turning {birthday.age}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#6B7280" />
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
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  birthdayCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  birthdayInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  position: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  date: {
    fontSize: 14,
    color: "#6B7280",
  },
  age: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default BirthdaysPage;
