import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  style?: ViewStyle
  textStyle?: TextStyle
}

const Badge = ({ 
  children, 
  variant = "default", 
  style, 
  textStyle 
}: BadgeProps) => {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  // Variant styles
  default: {
    backgroundColor: "#7C3AED", // primary color
    borderColor: "transparent",
  },
  defaultText: {
    color: "#FFFFFF", // primary-foreground
  },
  secondary: {
    backgroundColor: "#E5E7EB", // secondary color
    borderColor: "transparent",
  },
  secondaryText: {
    color: "#1F2937", // secondary-foreground
  },
  destructive: {
    backgroundColor: "#EF4444", // destructive color
    borderColor: "transparent",
  },
  destructiveText: {
    color: "#FFFFFF", // destructive-foreground
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#E5E7EB",
  },
  outlineText: {
    color: "#374151", // foreground
  },
})

export { Badge }
