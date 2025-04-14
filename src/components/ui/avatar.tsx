import * as React from "react"
import { View, Image, Text, StyleSheet, ViewStyle, ImageStyle, TextStyle } from "react-native"

export interface AvatarProps {
  children: React.ReactNode
  style?: ViewStyle
  size?: "sm" | "md" | "lg" | "xl"
}

export interface AvatarImageProps {
  source: { uri: string } | number
  style?: ImageStyle
}

export interface AvatarFallbackProps {
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

const getSize = (size: "sm" | "md" | "lg" | "xl" = "md") => {
  switch (size) {
    case "sm":
      return 32
    case "lg":
      return 48
    case "xl":
      return 64
    case "md":
    default:
      return 40
  }
}

const Avatar = ({ children, style, size = "md" }: AvatarProps) => {
  const dimension = getSize(size)
  
  return (
    <View 
      style={[
        styles.avatar, 
        { width: dimension, height: dimension },
        style
      ]}
    >
      {children}
    </View>
  )
}

const AvatarImage = ({ source, style }: AvatarImageProps) => {
  return (
    <Image
      source={source}
      style={[styles.image, style]}
      resizeMode="cover"
    />
  )
}

const AvatarFallback = ({ children, style, textStyle }: AvatarFallbackProps) => {
  return (
    <View style={[styles.fallback, style]}>
      <Text style={[styles.fallbackText, textStyle]}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 9999,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
})

export { Avatar, AvatarImage, AvatarFallback }
