import * as React from "react"
import { Text, TextProps, StyleSheet, TextStyle } from "react-native"

export interface LabelProps extends TextProps {
  variant?: "default" | "secondary" | "disabled"
  style?: TextStyle
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ 
    variant = "default",
    style,
    ...props 
  }, ref) => {
    return (
      <Text
        ref={ref}
        style={[
          styles.base,
          variant === "secondary" && styles.secondary,
          variant === "disabled" && styles.disabled,
          style
        ]}
        {...props}
      />
    )
  }
)

Label.displayName = "Label"

const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  secondary: {
    color: "#6B7280",
  },
  disabled: {
    opacity: 0.7,
  },
})

export { Label }
