import * as React from "react"
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"

export interface ToggleProps {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  style?: ViewStyle
  textStyle?: TextStyle
  children?: React.ReactNode
}

const Toggle = React.forwardRef<TouchableOpacity, ToggleProps>(
  ({ 
    pressed = false, 
    onPressedChange, 
    disabled = false, 
    variant = "default", 
    size = "default", 
    style, 
    textStyle,
    children 
  }, ref) => {
    const handlePress = () => {
      if (!disabled && onPressedChange) {
        onPressedChange(!pressed)
      }
    }

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.toggle,
          styles[variant],
          styles[size],
          pressed && styles.pressed,
          disabled && styles.disabled,
          style
        ]}
      >
        {children}
      </TouchableOpacity>
    )
  }
)

Toggle.displayName = "Toggle"

const styles = StyleSheet.create({
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  default: {
    backgroundColor: "transparent",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "transparent",
  },
  defaultSize: {
    height: 40,
    paddingHorizontal: 12,
  },
  sm: {
    height: 36,
    paddingHorizontal: 10,
  },
  lg: {
    height: 44,
    paddingHorizontal: 20,
  },
  pressed: {
    backgroundColor: "#F3F4F6",
  },
  disabled: {
    opacity: 0.5,
  },
})

export { Toggle }
