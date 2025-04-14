import React, { useState } from "react"
import { View, Modal, TouchableOpacity, StyleSheet, ViewStyle, Animated } from "react-native"

interface HoverCardProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface HoverCardTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface HoverCardContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  style?: ViewStyle
}

const HoverCard = ({ children, style }: HoverCardProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const HoverCardTrigger = ({ children, onPress, style }: HoverCardTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
    </TouchableOpacity>
  )
}

const HoverCardContent = ({ children, visible, onClose, style }: HoverCardContentProps) => {
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
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
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
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  trigger: {
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: 256, // w-64
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export { HoverCard, HoverCardTrigger, HoverCardContent }
