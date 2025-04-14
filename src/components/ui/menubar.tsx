import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Pressable,
} from "react-native"
import { Feather } from "@expo/vector-icons"

interface MenubarProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface MenubarMenuProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface MenubarTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface MenubarContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  style?: ViewStyle
}

interface MenubarItemProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  inset?: boolean
  style?: ViewStyle
}

interface MenubarCheckboxItemProps {
  children: React.ReactNode
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
  style?: ViewStyle
}

interface MenubarRadioItemProps {
  children: React.ReactNode
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
  value?: string
  style?: ViewStyle
}

interface MenubarLabelProps {
  children: React.ReactNode
  inset?: boolean
  style?: TextStyle
}

interface MenubarSeparatorProps {
  style?: ViewStyle
}

interface MenubarShortcutProps {
  children: React.ReactNode
  style?: TextStyle
}

const Menubar = React.forwardRef<View, MenubarProps>(({ children, style }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.menubar, style]}
    >
      {children}
    </View>
  )
})
Menubar.displayName = "Menubar"

const MenubarMenu = React.forwardRef<View, MenubarMenuProps>(({ children, style }, ref) => {
  return (
    <View ref={ref} style={[styles.menu, style]}>
      {children}
    </View>
  )
})
MenubarMenu.displayName = "MenubarMenu"

const MenubarTrigger = React.forwardRef<TouchableOpacity, MenubarTriggerProps>(
  ({ children, onPress, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.trigger, style]}
      >
        {children}
        <Feather name="chevron-down" size={16} color="#6B7280" style={styles.triggerIcon} />
      </TouchableOpacity>
    )
  }
)
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarContent = React.forwardRef<View, MenubarContentProps>(
  ({ children, visible, onClose, style }, ref) => {
    const [fadeAnim] = useState(new Animated.Value(0))

    React.useEffect(() => {
      if (visible) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start()
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start()
      }
    }, [visible])

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
      >
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <Animated.View
            ref={ref}
            style={[
              styles.content,
              style,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {children}
          </Animated.View>
        </Pressable>
      </Modal>
    )
  }
)
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef<TouchableOpacity, MenubarItemProps>(
  ({ children, onPress, disabled, inset, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.item,
          inset && styles.itemInset,
          disabled && styles.itemDisabled,
          style,
        ]}
      >
        {children}
      </TouchableOpacity>
    )
  }
)
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<TouchableOpacity, MenubarCheckboxItemProps>(
  ({ children, onPress, checked, disabled, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.checkboxItem,
          disabled && styles.itemDisabled,
          style,
        ]}
      >
        <View style={styles.checkboxIndicator}>
          {checked && <Feather name="check" size={16} color="#000000" />}
        </View>
        {children}
      </TouchableOpacity>
    )
  }
)
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioItem = React.forwardRef<TouchableOpacity, MenubarRadioItemProps>(
  ({ children, onPress, checked, disabled, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.radioItem,
          disabled && styles.itemDisabled,
          style,
        ]}
      >
        <View style={[styles.radio, checked && styles.radioChecked]}>
          {checked && <View style={styles.radioDot} />}
        </View>
        {children}
      </TouchableOpacity>
    )
  }
)
MenubarRadioItem.displayName = "MenubarRadioItem"

const MenubarLabel = React.forwardRef<Text, MenubarLabelProps>(
  ({ children, inset, style }, ref) => {
    return (
      <Text
        ref={ref}
        style={[
          styles.label,
          inset && styles.labelInset,
          style,
        ]}
      >
        {children}
      </Text>
    )
  }
)
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<View, MenubarSeparatorProps>(
  ({ style }, ref) => {
    return <View ref={ref} style={[styles.separator, style]} />
  }
)
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = React.forwardRef<Text, MenubarShortcutProps>(
  ({ children, style }, ref) => {
    return (
      <Text ref={ref} style={[styles.shortcut, style]}>
        {children}
      </Text>
    )
  }
)
MenubarShortcut.displayName = "MenubarShortcut"

const styles = StyleSheet.create({
  menubar: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    padding: 4,
  },
  menu: {
    position: "relative",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  triggerIcon: {
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minWidth: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  checkboxIndicator: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#6B7280",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  radio: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#6B7280",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioChecked: {
    borderColor: "#7C3AED",
    backgroundColor: "#7C3AED",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
    marginHorizontal: 4,
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: 12,
    letterSpacing: 1,
    color: "#6B7280",
  },
})

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarShortcut,
}
