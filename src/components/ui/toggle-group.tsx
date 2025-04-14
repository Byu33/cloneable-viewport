import * as React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"

export interface ToggleGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  style?: ViewStyle
  children?: React.ReactNode
}

interface ToggleGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  ({ 
    value, 
    defaultValue, 
    onValueChange, 
    variant = "default", 
    size = "default", 
    style, 
    children 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = value ?? internalValue

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <ToggleGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, variant, size }}>
        <View ref={ref} style={[styles.group, style]}>
          {children}
        </View>
      </ToggleGroupContext.Provider>
    )
  }
)

ToggleGroup.displayName = "ToggleGroup"

export interface ToggleGroupItemProps {
  value: string
  disabled?: boolean
  style?: ViewStyle
  children?: React.ReactNode
}

interface ToggleChildProps {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled, style, children }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    const isSelected = context.value === value

    return (
      <View ref={ref} style={[styles.item, style]}>
        {React.Children.map(children, child => {
          if (React.isValidElement<ToggleChildProps>(child)) {
            return React.cloneElement(child, {
              pressed: isSelected,
              onPressedChange: () => context.onValueChange?.(value),
              disabled,
              variant: context.variant,
              size: context.size,
            })
          }
          return child
        })}
      </View>
    )
  }
)

ToggleGroupItem.displayName = "ToggleGroupItem"

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    marginRight: 1,
  },
})

export { ToggleGroup, ToggleGroupItem }
