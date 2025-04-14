import React, { useState, useRef } from "react"
import { View, StyleSheet, ViewStyle, PanResponder, Animated, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ResizablePanelGroupProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  style?: ViewStyle
}

interface ResizablePanelProps {
  children: React.ReactNode
  defaultSize?: number
  minSize?: number
  maxSize?: number
  style?: ViewStyle
}

interface ResizableHandleProps {
  withHandle?: boolean
  style?: ViewStyle
}

const ResizablePanelGroup = React.forwardRef<View, ResizablePanelGroupProps>(
  ({ children, direction = "horizontal", style }, ref) => {
    return (
      <View 
        ref={ref} 
        style={[
          styles.panelGroup, 
          direction === "vertical" && styles.panelGroupVertical,
          style
        ]}
      >
        {children}
      </View>
    )
  }
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = React.forwardRef<View, ResizablePanelProps>(
  ({ children, defaultSize = 100, minSize = 30, maxSize = 100, style }, ref) => {
    const [size, setSize] = useState(defaultSize)
    const sizeAnim = useRef(new Animated.Value(defaultSize)).current

    const updateSize = (newSize: number) => {
      const clampedSize = Math.min(Math.max(newSize, minSize), maxSize)
      setSize(clampedSize)
      Animated.timing(sizeAnim, {
        toValue: clampedSize,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }

    return (
      <Animated.View 
        ref={ref} 
        style={[
          styles.panel,
          { flex: size },
          style
        ]}
      >
        {children}
      </Animated.View>
    )
  }
)
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = React.forwardRef<View, ResizableHandleProps>(
  ({ withHandle, style }, ref) => {
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // Handle resize logic here
          // This would need to be implemented based on the specific use case
        },
      })
    ).current

    return (
      <View
        ref={ref}
        style={[styles.handle, style]}
        {...panResponder.panHandlers}
      >
        {withHandle && (
          <View style={styles.handleIcon}>
            <Feather name="grip-vertical" size={10} color="#6B7280" />
          </View>
        )}
      </View>
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"

const styles = StyleSheet.create({
  panelGroup: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  panelGroupVertical: {
    flexDirection: "column",
  },
  panel: {
    flex: 1,
  },
  handle: {
    width: 1,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  handleIcon: {
    width: 12,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
})

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
