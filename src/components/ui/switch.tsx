import * as React from "react"
import { Switch as RNSwitch, StyleSheet, ViewStyle, StyleProp } from "react-native"

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const Switch = React.forwardRef<RNSwitch, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled = false, style, ...props }, ref) => {
    return (
      <RNSwitch
        ref={ref}
        value={checked}
        onValueChange={onCheckedChange}
        disabled={disabled}
        style={[styles.switch, style]}
        trackColor={{ false: "#E5E7EB", true: "#000000" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E5E7EB"
        {...props}
      />
    )
  }
)
Switch.displayName = "Switch"

const styles = StyleSheet.create({
  switch: {
    width: 44,
    height: 24,
  },
})

export { Switch }
