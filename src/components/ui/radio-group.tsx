import React from "react"
import { View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"

interface RadioGroupProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  style?: ViewStyle
}

interface RadioGroupItemProps {
  children: React.ReactNode
  value: string
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
}

const RadioGroup = React.forwardRef<View, RadioGroupProps>(
  ({ children, value, onValueChange, style }, ref) => {
    return (
      <View ref={ref} style={[styles.radioGroup, style]}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
              checked: (child as React.ReactElement<RadioGroupItemProps>).props.value === value,
              onPress: () => onValueChange?.((child as React.ReactElement<RadioGroupItemProps>).props.value),
            })
          }
          return child
        })}
      </View>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<TouchableOpacity, RadioGroupItemProps>(
  ({ children, value, style, textStyle, onPress, checked, disabled }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[styles.radioItem, disabled && styles.itemDisabled, style]}
      >
        <View style={[styles.radio, checked && styles.radioChecked]}>
          {checked && <View style={styles.radioDot} />}
        </View>
        <View style={styles.radioLabelContainer}>
          {children}
        </View>
      </TouchableOpacity>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

const styles = StyleSheet.create({
  radioGroup: {
    width: "100%",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
  },
  radioChecked: {
    backgroundColor: "#6B7280",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  radioLabelContainer: {
    marginLeft: 8,
  },
})

export { RadioGroup, RadioGroupItem }
