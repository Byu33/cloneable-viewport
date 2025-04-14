import React, { useState } from "react"
import { View, Modal, TouchableOpacity, StyleSheet, ViewStyle, Animated, Text, TextStyle } from "react-native"

interface TooltipProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface TooltipTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface TooltipContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  style?: ViewStyle
  textStyle?: TextStyle
}

const Tooltip = ({ children, style }: TooltipProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const TooltipTrigger = ({ children, onPress, style }: TooltipTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
    </TouchableOpacity>
  )
}

const TooltipContent = ({ 
  children, 
  visible, 
  onClose, 
  side = "bottom",
  sideOffset = 4,
  style,
  textStyle 
}: TooltipContentProps) => {
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

  const getSideStyles = (): ViewStyle => {
    switch (side) {
      case "top":
        return {
          bottom: 0,
          marginBottom: sideOffset,
        }
      case "right":
        return {
          left: 0,
          marginLeft: sideOffset,
        }
      case "bottom":
        return {
          top: 0,
          marginTop: sideOffset,
        }
      case "left":
        return {
          right: 0,
          marginRight: sideOffset,
        }
      default:
        return {}
    }
  }

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
            getSideStyles(),
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
          {typeof children === "string" ? (
            <Text style={[styles.text, textStyle]}>{children}</Text>
          ) : (
            children
          )}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  trigger: {
    backgroundColor: "transparent",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
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
  text: {
    fontSize: 14,
    color: "#000000",
  },
})

export { Tooltip, TooltipTrigger, TooltipContent }
