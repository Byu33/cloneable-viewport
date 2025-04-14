import * as React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"

interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
  style?: ViewStyle
}

const Separator = React.forwardRef<View, SeparatorProps>(
  ({ orientation = "horizontal", style }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.separator,
          orientation === "vertical" ? styles.vertical : styles.horizontal,
          style,
        ]}
      />
    )
  }
)
Separator.displayName = "Separator"

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#E5E7EB", // border color
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    width: 1,
    height: "100%",
  },
})

export { Separator }
