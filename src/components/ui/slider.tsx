import * as React from "react"
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native"
import Slider from "@react-native-community/slider"

interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  onSlidingComplete?: (value: number) => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const SliderComponent = React.forwardRef<View, SliderProps>(
  ({ 
    value, 
    defaultValue = 0, 
    min = 0, 
    max = 100, 
    step = 1, 
    onValueChange, 
    onSlidingComplete,
    disabled = false,
    style,
    ...props 
  }, ref) => {
    return (
      <View ref={ref} style={[styles.container, style]} {...props}>
        <Slider
          value={value}
          minimumValue={min}
          maximumValue={max}
          step={step}
          onValueChange={onValueChange}
          onSlidingComplete={onSlidingComplete}
          disabled={disabled}
          minimumTrackTintColor="#000000" // primary color
          maximumTrackTintColor="#E5E7EB" // secondary color
          thumbTintColor="#FFFFFF" // background color
        />
      </View>
    )
  }
)
SliderComponent.displayName = "Slider"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
})

export { SliderComponent as Slider }
