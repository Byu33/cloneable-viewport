import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated } from "react-native"
import { Feather } from "@expo/vector-icons"

export type ToastActionElement = React.ReactNode

export interface ToastProps {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: "default" | "destructive"
  onClose?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

const Toast = React.forwardRef<View, ToastProps>(
  ({ title, description, action, variant = "default", onClose, style, textStyle }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.toast,
          variant === "destructive" && styles.toastDestructive,
          style
        ]}
      >
        <View style={styles.content}>
          {title && (
            <Text style={[
              styles.title,
              variant === "destructive" && styles.titleDestructive,
              textStyle
            ]}>
              {title}
            </Text>
          )}
          {description && (
            <Text style={[
              styles.description,
              variant === "destructive" && styles.descriptionDestructive,
              textStyle
            ]}>
              {description}
            </Text>
          )}
        </View>
        {action}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Feather
            name="x"
            size={16}
            color={variant === "destructive" ? "#FCA5A5" : "#6B7280"}
          />
        </TouchableOpacity>
      </View>
    )
  }
)

Toast.displayName = "Toast"

const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toastDestructive: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  titleDestructive: {
    color: "#991B1B",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
  descriptionDestructive: {
    color: "#7F1D1D",
  },
  closeButton: {
    padding: 4,
  },
})

export { Toast }
