import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"

interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  style?: ViewStyle
}

interface TabsListProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  style?: ViewStyle
}

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: "",
  onValueChange: () => {},
})

const Tabs = ({ defaultValue, value, onValueChange, children, style }: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const currentValue = value || internalValue
  const handleValueChange = (newValue: string) => {
    if (!value) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <View style={[styles.tabs, style]}>{children}</View>
    </TabsContext.Provider>
  )
}

const TabsList = ({ children, style }: TabsListProps) => {
  return <View style={[styles.tabsList, style]}>{children}</View>
}

const TabsTrigger = ({ value, children, style, textStyle }: TabsTriggerProps) => {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <TouchableOpacity
      style={[styles.tabsTrigger, isSelected && styles.tabsTriggerActive, style]}
      onPress={() => onValueChange(value)}
    >
      <Text style={[styles.tabsTriggerText, isSelected && styles.tabsTriggerTextActive, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const TabsContent = ({ value, children, style }: TabsContentProps) => {
  const { value: selectedValue } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return <View style={[styles.tabsContent, style]}>{children}</View>
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
  },
  tabsList: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 4,
  },
  tabsTrigger: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  tabsTriggerActive: {
    backgroundColor: "#FFFFFF",
  },
  tabsTriggerText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  tabsTriggerTextActive: {
    color: "#000000",
  },
  tabsContent: {
    marginTop: 8,
  },
})

export { Tabs, TabsList, TabsTrigger, TabsContent }
