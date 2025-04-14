import React, { useEffect } from "react"
import { View, StyleSheet, ViewStyle, Animated } from "react-native"

interface ProgressProps {
  value?: number
  max?: number
  style?: ViewStyle
  progressStyle?: ViewStyle
}

const Progress = React.forwardRef<View, ProgressProps>(
  ({ value = 0, max = 100, style, progressStyle }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const widthAnim = React.useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.timing(widthAnim, {
        toValue: percentage,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }, [percentage])

    return (
      <View ref={ref} style={[styles.progress, style]}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
            progressStyle,
          ]}
        />
      </View>
    )
  }
)
Progress.displayName = "Progress"

const styles = StyleSheet.create({
  progress: {
    position: "relative",
    height: 8,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
    borderRadius: 9999,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#7C3AED",
    borderRadius: 9999,
  },
})

export { Progress }
