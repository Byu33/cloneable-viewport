import * as React from "react"
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from "react-native"
import { Feather } from "@expo/vector-icons"

export interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export interface AlertDialogTriggerProps {
  children: React.ReactNode
  onPress: () => void
}

export interface AlertDialogContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface AlertDialogHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface AlertDialogFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface AlertDialogTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export interface AlertDialogDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export interface AlertDialogActionProps {
  children: React.ReactNode
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  variant?: "default" | "destructive"
}

export interface AlertDialogCancelProps {
  children: React.ReactNode
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

const AlertDialog = ({ open, onOpenChange, children }: AlertDialogProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      {children}
    </Modal>
  )
}

const AlertDialogTrigger = ({ children, onPress }: AlertDialogTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  )
}

const AlertDialogOverlay = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  )
}

const AlertDialogContent = ({ children, style }: AlertDialogContentProps) => {
  const [fadeAnim] = React.useState(new Animated.Value(0))
  const [scaleAnim] = React.useState(new Animated.Value(0.95))
  
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])
  
  return (
    <View style={styles.contentContainer}>
      <AlertDialogOverlay onPress={() => {}} />
      <Animated.View 
        style={[
          styles.content,
          style,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  )
}

const AlertDialogHeader = ({ children, style }: AlertDialogHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  )
}

const AlertDialogFooter = ({ children, style }: AlertDialogFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  )
}

const AlertDialogTitle = ({ children, style }: AlertDialogTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  )
}

const AlertDialogDescription = ({ children, style }: AlertDialogDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  )
}

const AlertDialogAction = ({ 
  children, 
  onPress, 
  style, 
  textStyle,
  variant = "default"
}: AlertDialogActionProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.actionButton,
        variant === "destructive" && styles.destructiveButton,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text 
        style={[
          styles.actionButtonText,
          variant === "destructive" && styles.destructiveButtonText,
          textStyle
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const AlertDialogCancel = ({ children, onPress, style, textStyle }: AlertDialogCancelProps) => {
  return (
    <TouchableOpacity 
      style={[styles.cancelButton, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.cancelButtonText, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
  actionButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  destructiveButton: {
    backgroundColor: "#EF4444",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  destructiveButtonText: {
    color: "#FFFFFF",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
})

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
