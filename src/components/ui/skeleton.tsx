import * as React from "react"
import { View, StyleSheet, ViewStyle, Animated } from "react-native"

interface SkeletonProps {
  style?: ViewStyle
}

const Skeleton = React.forwardRef<View, SkeletonProps>(({ style }, ref) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    )
    animation.start()
    return () => animation.stop()
  }, [])

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  })

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.skeleton,
        { opacity },
        style,
      ]}
    />
  )
})
Skeleton.displayName = "Skeleton"

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E5E7EB", // gray-200
    borderRadius: 4,
  },
})

export { Skeleton }
