import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

const SisterPointsPage = () => {
  const navigation = useNavigation<NavigationProp>();

  // Mock data for points history
  const pointsHistory = [
    {
      id: 1,
      title: "Attended Sisterhood Event",
      points: 10,
      date: "Feb 16, 2024",
      type: "earned",
    },
    {
      id: 2,
      title: "Completed Professional Development",
      points: 15,
      date: "Feb 15, 2024",
      type: "earned",
    },
    {
      id: 3,
      title: "Redeemed for Event Ticket",
      points: -20,
      date: "Feb 14, 2024",
      type: "spent",
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRedeemPoints = () => {
    navigation.navigate("RedeemPoints");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sister Points</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Points</Text>
          <Text style={styles.pointsValue}>250</Text>
          <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemPoints}>
            <Text style={styles.redeemButtonText}>Redeem Points</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Points History</Text>
          {pointsHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={[
                styles.historyPoints,
                { color: item.type === "earned" ? "#059669" : "#DC2626" }
              ]}>
                {item.type === "earned" ? "+" : ""}{item.points}
              </Text>
            </View>
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
  pointsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  pointsLabel: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#7C3AED",
    marginBottom: 16,
  },
  redeemButton: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  redeemButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  historySection: {
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
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SisterPointsPage;
