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
  ScrollView,
} from "react-native"
import { Feather } from "@expo/vector-icons"

interface NavigationMenuProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface NavigationMenuListProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface NavigationMenuItemProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface NavigationMenuTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface NavigationMenuContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  style?: ViewStyle
}

interface NavigationMenuLinkProps {
  children: React.ReactNode
  onPress?: () => void
  active?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

const NavigationMenu = React.forwardRef<View, NavigationMenuProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.navigationMenu, style]}>
        {children}
      </View>
    )
  }
)
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<View, NavigationMenuListProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.list, style]}>
        {children}
      </View>
    )
  }
)
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<View, NavigationMenuItemProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.item, style]}>
        {children}
      </View>
    )
  }
)
NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuTrigger = React.forwardRef<TouchableOpacity, NavigationMenuTriggerProps>(
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
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<View, NavigationMenuContentProps>(
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
            <ScrollView>{children}</ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    )
  }
)
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = React.forwardRef<TouchableOpacity, NavigationMenuLinkProps>(
  ({ children, onPress, active, style, textStyle }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.link, active && styles.linkActive, style]}
      >
        <Text style={[styles.linkText, active && styles.linkTextActive, textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)
NavigationMenuLink.displayName = "NavigationMenuLink"

const styles = StyleSheet.create({
  navigationMenu: {
    position: "relative",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  item: {
    position: "relative",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "transparent",
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
    minWidth: 220,
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  link: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  linkActive: {
    backgroundColor: "#F3F4F6",
  },
  linkText: {
    fontSize: 14,
    color: "#374151",
  },
  linkTextActive: {
    fontWeight: "500",
    color: "#111827",
  },
})

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
}
