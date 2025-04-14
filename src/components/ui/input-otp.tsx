import React, { useState, useRef, useEffect } from "react"
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native"

interface InputOTPProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

interface InputOTPSlotProps {
  value?: string
  isFocused?: boolean
  isActive?: boolean
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

const InputOTP = React.forwardRef<View, InputOTPProps>(
  ({ value, onChange, length = 6, disabled = false, style }, ref) => {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1)
    const inputRefs = useRef<TextInput[]>([])

    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    const handleChange = (text: string, index: number) => {
      const newValue = value.split("")
      newValue[index] = text
      onChange(newValue.join(""))

      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }

    return (
      <View ref={ref} style={[styles.container, style]}>
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot
            key={index}
            value={value[index]}
            isFocused={focusedIndex === index}
            isActive={!!value[index]}
            style={styles.slot}
          >
            <TextInput
              ref={(el) => el && (inputRefs.current[index] = el)}
              style={styles.input}
              maxLength={1}
              keyboardType="numeric"
              value={value[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              editable={!disabled}
            />
          </InputOTPSlot>
        ))}
      </View>
    )
  }
)
InputOTP.displayName = "InputOTP"

const InputOTPSlot = React.forwardRef<View, InputOTPSlotProps>(
  ({ value, isFocused, isActive, style, children }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.slot,
          isFocused && styles.slotFocused,
          isActive && styles.slotActive,
          style,
        ]}
      >
        {children}
        {isFocused && (
          <View style={styles.caret} />
        )}
      </View>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  slot: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  slotFocused: {
    borderColor: "#7C3AED",
    borderWidth: 2,
  },
  slotActive: {
    borderColor: "#7C3AED",
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 16,
    color: "#374151",
  },
  caret: {
    position: "absolute",
    width: 2,
    height: 16,
    backgroundColor: "#7C3AED",
    opacity: 0.5,
  },
})

export { InputOTP }
