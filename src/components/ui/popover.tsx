import React, { useState } from "react"
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
  Pressable,
  Dimensions,
  LayoutRectangle,
} from "react-native"

interface PopoverProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface PopoverTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface PopoverContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  triggerRef: React.RefObject<View>
  style?: ViewStyle
}

const Popover = React.forwardRef<View, PopoverProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.popover, style]}>
        {children}
      </View>
    )
  }
)
Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef<TouchableOpacity, PopoverTriggerProps>(
  ({ children, onPress, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.trigger, style]}
      >
        {children}
      </TouchableOpacity>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<View, PopoverContentProps>(
  ({ children, visible, onClose, triggerRef, style }, ref) => {
    const [fadeAnim] = useState(new Animated.Value(0))
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [contentSize, setContentSize] = useState<LayoutRectangle | null>(null)

    React.useEffect(() => {
      if (visible) {
        updatePosition()
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

    const updatePosition = () => {
      if (triggerRef.current && contentSize) {
        triggerRef.current.measureInWindow((x, y, width, height) => {
          const windowWidth = Dimensions.get("window").width
          const windowHeight = Dimensions.get("window").height

          let top = y + height + 8
          let left = x

          // Check if popover would go off screen to the right
          if (left + contentSize.width > windowWidth) {
            left = windowWidth - contentSize.width - 8
          }

          // Check if popover would go off screen at the bottom
          if (top + contentSize.height > windowHeight) {
            top = y - contentSize.height - 8
          }

          setPosition({ top, left })
        })
      }
    }

    const handleLayout = (event: any) => {
      setContentSize(event.nativeEvent.layout)
    }

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
            onLayout={handleLayout}
            style={[
              styles.content,
              {
                top: position.top,
                left: position.left,
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
              style,
            ]}
          >
            {children}
          </Animated.View>
        </Pressable>
      </Modal>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

const styles = StyleSheet.create({
  popover: {
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
    minWidth: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
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
})

export { Popover, PopoverTrigger, PopoverContent }
