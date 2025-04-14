import * as React from "react"
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  icon?: keyof typeof Feather.glyphMap
  style?: ViewStyle
  textStyle?: TextStyle
}

const getButtonStyles = (variant: ButtonVariant, size: ButtonSize): ViewStyle => {
  const baseStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  }

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    default: {
      backgroundColor: "#7C3AED", // Primary color
    },
    destructive: {
      backgroundColor: "#EF4444", // Destructive color
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    secondary: {
      backgroundColor: "#F3F4F6", // Secondary color
    },
    ghost: {
      backgroundColor: "transparent",
    },
    link: {
      backgroundColor: "transparent",
    },
  }

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    default: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    icon: {
      width: 40,
      height: 40,
      padding: 0,
    },
  }

  return {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
  }
}

const getTextStyles = (variant: ButtonVariant, size: ButtonSize): TextStyle => {
  const baseStyle: TextStyle = {
    fontSize: 14,
    fontWeight: "600",
  }

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    default: {
      color: "#FFFFFF",
    },
    destructive: {
      color: "#FFFFFF",
    },
    outline: {
      color: "#374151",
    },
    secondary: {
      color: "#374151",
    },
    ghost: {
      color: "#374151",
    },
    link: {
      color: "#7C3AED",
      textDecorationLine: "underline",
    },
  }

  const sizeTextStyles: Record<ButtonSize, TextStyle> = {
    default: {
      fontSize: 14,
    },
    sm: {
      fontSize: 12,
    },
    lg: {
      fontSize: 16,
    },
    icon: {
      fontSize: 0, // Hide text for icon buttons
    },
  }

  return {
    ...baseStyle,
    ...variantTextStyles[variant],
    ...sizeTextStyles[size],
  }
}

const Button = React.forwardRef<any, ButtonProps>(
  ({ 
    variant = "default", 
    size = "default", 
    children, 
    onPress, 
    disabled = false, 
    loading = false,
    icon,
    style,
    textStyle,
    ...props 
  }, ref) => {
    const buttonStyles = getButtonStyles(variant, size)
    const textStyles = getTextStyles(variant, size)

    return (
      <TouchableOpacity
        ref={ref}
        style={[
          buttonStyles,
          disabled && { opacity: 0.5 },
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        {...props}
      >
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === "default" || variant === "destructive" ? "#FFFFFF" : "#374151"} 
          />
        ) : (
          <>
            {icon && <Feather name={icon} size={16} color={textStyles.color} style={{ marginRight: 8 }} />}
            {typeof children === "string" ? (
              <Text style={[textStyles, textStyle]}>{children}</Text>
            ) : (
              children
            )}
          </>
        )}
      </TouchableOpacity>
    )
  }
)

Button.displayName = "Button"

export { Button }
