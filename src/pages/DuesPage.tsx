import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationProp } from "@/types/navigation";

const DuesPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const duesInfo = {
    totalAmount: 300,
    dueDate: "January 6, 2024",
    isPaid: false,
    breakdown: [
      { name: "National Dues", amount: 150 },
      { name: "Chapter Dues", amount: 125 },
      { name: "Operations Fee", amount: 25 }
    ]
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePayNow = () => {
    // Payment processing would go here
    console.log("Processing payment");
  };

  const handlePaymentPlan = () => {
    navigation.navigate("PaymentPlan");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dues</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Semester's Dues</Text>
          
          {duesInfo.isPaid ? (
            <View style={styles.paidContainer}>
              <Icon name="check-circle" size={64} color="#10B981" />
              <Text style={styles.paidText}>Dues Paid</Text>
              <Text style={styles.paidDate}>Paid on {duesInfo.dueDate}</Text>
            </View>
          ) : (
            <View style={styles.unpaidContainer}>
              <Text style={styles.amountLabel}>Total Amount Due</Text>
              <Text style={styles.amount}>${duesInfo.totalAmount}</Text>
              <Text style={styles.dueDate}>Due by {duesInfo.dueDate}</Text>
              
              <View style={styles.breakdownContainer}>
                <Text style={styles.breakdownTitle}>Breakdown</Text>
                {duesInfo.breakdown.map((item, index) => (
                  <View key={index} style={styles.breakdownItem}>
                    <Text style={styles.breakdownName}>{item.name}</Text>
                    <Text style={styles.breakdownAmount}>${item.amount}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.payButton}
                  onPress={handlePayNow}
                >
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.planButton}
                  onPress={handlePaymentPlan}
                >
                  <Text style={styles.planButtonText}>Set Up Payment Plan</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  paidContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  paidText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10B981",
    marginTop: 8,
  },
  paidDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  unpaidContainer: {
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  amount: {
    fontSize: 36,
    fontWeight: "700",
    marginVertical: 8,
  },
  dueDate: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  breakdownContainer: {
    width: "100%",
    marginTop: 16,
    marginBottom: 24,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  breakdownName: {
    fontSize: 16,
  },
  breakdownAmount: {
    fontSize: 16,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
  },
  payButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  planButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7C3AED",
  },
  planButtonText: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DuesPage;
