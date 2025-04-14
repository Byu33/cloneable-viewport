import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CardHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CardTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

interface CardDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

interface CardContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CardFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

const Card = React.forwardRef<View, CardProps>(({ children, style }, ref) => (
  <View
    ref={ref}
    style={[styles.card, style]}
  >
    {children}
  </View>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, style }, ref) => (
  <View
    ref={ref}
    style={[styles.cardHeader, style]}
  >
    {children}
  </View>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<Text, CardTitleProps>(({ children, style }, ref) => (
  <Text
    ref={ref}
    style={[styles.cardTitle, style]}
  >
    {children}
  </Text>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(({ children, style }, ref) => (
  <Text
    ref={ref}
    style={[styles.cardDescription, style]}
  >
    {children}
  </Text>
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<View, CardContentProps>(({ children, style }, ref) => (
  <View
    ref={ref}
    style={[styles.cardContent, style]}
  >
    {children}
  </View>
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<View, CardFooterProps>(({ children, style }, ref) => (
  <View
    ref={ref}
    style={[styles.cardFooter, style]}
  >
    {children}
  </View>
))
CardFooter.displayName = "CardFooter"

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    paddingTop: 0,
  },
})

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
