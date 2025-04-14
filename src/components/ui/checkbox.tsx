import * as React from "react"
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  style?: ViewStyle
}

const Checkbox = React.forwardRef<TouchableOpacity, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, style }, ref) => {
    const handlePress = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked)
      }
    }

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
          style,
        ]}
      >
        {checked && (
          <Feather name="check" size={16} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    )
  }
)
Checkbox.displayName = "Checkbox"

const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  disabled: {
    opacity: 0.5,
  },
})

export { Checkbox }
