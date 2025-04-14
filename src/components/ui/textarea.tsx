import * as React from "react"
import { TextInput, View, StyleSheet, ViewStyle, TextStyle, TextInputProps } from "react-native"

export interface TextareaProps extends TextInputProps {
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  error?: boolean
}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ 
    containerStyle, 
    inputStyle, 
    error = false,
    placeholderTextColor = "#9CA3AF",
    multiline = true,
    numberOfLines = 4,
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
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          {...props}
        />
      </View>
    )
  }
)

Textarea.displayName = "Textarea"

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
    minHeight: 80,
    padding: 12,
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

export { Textarea }
