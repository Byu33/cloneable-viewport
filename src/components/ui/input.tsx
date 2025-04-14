import * as React from "react"
import { TextInput, View, TextInputProps, StyleSheet, ViewStyle, TextStyle } from "react-native"

export interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  error?: boolean
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ 
    containerStyle, 
    inputStyle, 
    error = false,
    placeholderTextColor = "#9CA3AF",
    ...props 
  }, ref) => {
    return (
      <View style={[styles.container, error && styles.errorContainer, containerStyle]}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            error && styles.errorInput,
            inputStyle
          ]}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
      </View>
    )
  }
)

Input.displayName = "Input"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#374151",
  },
  errorContainer: {
    borderColor: "#EF4444",
  },
  errorInput: {
    color: "#EF4444",
  },
})

export { Input }
