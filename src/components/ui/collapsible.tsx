import * as React from "react"
import { View, TouchableOpacity, Animated, StyleSheet, ViewStyle, LayoutAnimation, Platform, UIManager } from "react-native"
import { Feather } from "@expo/vector-icons"

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  style?: ViewStyle
}

interface CollapsibleTriggerProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CollapsibleContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

const CollapsibleContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error("useCollapsible must be used within a Collapsible component")
  }
  return context
}

const Collapsible = React.forwardRef<View, CollapsibleProps>(
  ({ open = false, onOpenChange, children, style }, ref) => {
    const handleOpenChange = (newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen)
      }
    }

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
        <View ref={ref} style={[styles.collapsible, style]}>
          {children}
        </View>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<TouchableOpacity, CollapsibleTriggerProps>(
  ({ children, style }, ref) => {
    const { open, onOpenChange } = useCollapsible()

    const handlePress = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      onOpenChange(!open)
    }

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        style={[styles.trigger, style]}
      >
        {children}
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="#6B7280"
          style={styles.icon}
        />
      </TouchableOpacity>
    )
  }
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<View, CollapsibleContentProps>(
  ({ children, style }, ref) => {
    const { open } = useCollapsible()

    if (!open) {
      return null
    }

    return (
      <View ref={ref} style={[styles.content, style]}>
        {children}
      </View>
    )
  }
)
CollapsibleContent.displayName = "CollapsibleContent"

const styles = StyleSheet.create({
  collapsible: {
    width: "100%",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  icon: {
    marginLeft: 8,
  },
  content: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
  },
})

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
