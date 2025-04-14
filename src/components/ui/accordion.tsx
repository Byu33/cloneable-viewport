import * as React from "react"
import { View, Text, TouchableOpacity, Animated, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

export interface AccordionProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface AccordionItemProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface AccordionTriggerProps {
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
  isOpen?: boolean
}

export interface AccordionContentProps {
  children: React.ReactNode
  style?: ViewStyle
  isOpen?: boolean
}

const Accordion = ({ children, style }: AccordionProps) => {
  return (
    <View style={[styles.accordion, style]}>
      {children}
    </View>
  )
}

const AccordionItem = ({ children, style }: AccordionItemProps) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  )
}

const AccordionTrigger = ({ 
  children, 
  style, 
  textStyle, 
  onPress, 
  isOpen 
}: AccordionTriggerProps) => {
  return (
    <TouchableOpacity 
      style={[styles.trigger, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.triggerText, textStyle]}>
        {children}
      </Text>
      <Feather 
        name={isOpen ? "chevron-up" : "chevron-down"} 
        size={16} 
        color="#374151" 
      />
    </TouchableOpacity>
  )
}

const AccordionContent = ({ children, style, isOpen }: AccordionContentProps) => {
  const [height] = React.useState(new Animated.Value(0))
  const [contentHeight, setContentHeight] = React.useState(0)
  
  React.useEffect(() => {
    Animated.timing(height, {
      toValue: isOpen ? contentHeight : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isOpen, contentHeight])
  
  return (
    <Animated.View style={[styles.content, { height }, style]}>
      <View 
        style={styles.contentInner}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          setContentHeight(height)
        }}
      >
        {children}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  accordion: {
    width: "100%",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  content: {
    overflow: "hidden",
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
