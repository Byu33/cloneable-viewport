import React from "react"
import { ScrollView, View, StyleSheet, ViewStyle, ScrollViewProps } from "react-native"

interface ScrollAreaProps extends ScrollViewProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface ScrollBarProps {
  orientation?: "vertical" | "horizontal"
  style?: ViewStyle
}

const ScrollArea = React.forwardRef<ScrollView, ScrollAreaProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View style={[styles.scrollArea, style]}>
        <ScrollView
          ref={ref}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          {...props}
        >
          {children}
        </ScrollView>
      </View>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

const ScrollBar = React.forwardRef<View, ScrollBarProps>(
  ({ orientation = "vertical", style }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.scrollBar,
          orientation === "horizontal" && styles.scrollBarHorizontal,
          style
        ]}
      />
    )
  }
)
ScrollBar.displayName = "ScrollBar"

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  scrollBar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: "transparent",
  },
  scrollBarHorizontal: {
    right: "auto",
    bottom: 0,
    left: 0,
    width: "auto",
    height: 8,
  },
})

export { ScrollArea, ScrollBar }
