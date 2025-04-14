import * as React from "react"
import { View, Modal, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Animated, Dimensions } from "react-native"

interface SheetProps {
  children: React.ReactNode
}

interface SheetTriggerProps {
  children: React.ReactNode
  onPress: () => void
}

interface SheetContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface SheetHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface SheetFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface SheetTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

interface SheetDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

const Sheet = ({ children }: SheetProps) => {
  return <View>{children}</View>
}

const SheetTrigger = ({ children, onPress }: SheetTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const SheetContent = ({ children, style }: SheetContentProps) => {
  const [visible, setVisible] = React.useState(false)
  const slideAnim = React.useRef(new Animated.Value(0)).current
  const { height } = Dimensions.get("window")

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [visible])

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  })

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        />
        <Animated.View
          style={[
            styles.content,
            { transform: [{ translateY }] },
            style,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}

const SheetHeader = ({ children, style }: SheetHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  )
}

const SheetFooter = ({ children, style }: SheetFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  )
}

const SheetTitle = ({ children, style }: SheetTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  )
}

const SheetDescription = ({ children, style }: SheetDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    minHeight: 200,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
})

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

