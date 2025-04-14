import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

export type AlertVariant = "default" | "destructive"

export interface AlertProps {
  children: React.ReactNode
  variant?: AlertVariant
  style?: ViewStyle
}

export interface AlertTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export interface AlertDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

const Alert = ({ children, variant = "default", style }: AlertProps) => {
  return (
    <View style={[styles.alert, styles[variant], style]}>
      {children}
    </View>
  )
}

const AlertTitle = ({ children, style }: AlertTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  )
}

const AlertDescription = ({ children, style }: AlertDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  alert: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  default: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  destructive: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
  },
})

export { Alert, AlertTitle, AlertDescription }
