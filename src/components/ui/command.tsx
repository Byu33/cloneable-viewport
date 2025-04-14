import * as React from "react"
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CommandProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CommandDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CommandInputProps {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  style?: ViewStyle
}

interface CommandListProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CommandEmptyProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CommandGroupProps {
  children: React.ReactNode
  heading?: string
  style?: ViewStyle
}

interface CommandSeparatorProps {
  style?: ViewStyle
}

interface CommandItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  style?: ViewStyle
}

interface CommandShortcutProps {
  children: React.ReactNode
  style?: ViewStyle
}

const Command = React.forwardRef<View, CommandProps>(
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[styles.command, style]}
    >
      {children}
    </View>
  )
)
Command.displayName = "Command"

const CommandDialog = ({ children, open, onOpenChange }: CommandDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={styles.dialogContent}>
        <Command style={styles.dialogCommand}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<TextInput, CommandInputProps>(
  ({ value, onChangeText, placeholder, style }, ref) => (
    <View style={[styles.inputWrapper, style]}>
      <Feather name="search" size={16} color="#6B7280" style={styles.searchIcon} />
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        style={styles.input}
      />
    </View>
  )
)
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<ScrollView, CommandListProps>(
  ({ children, style }, ref) => (
    <ScrollView
      ref={ref}
      style={[styles.list, style]}
    >
      {children}
    </ScrollView>
  )
)
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<View, CommandEmptyProps>(
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[styles.empty, style]}
    >
      {children}
    </View>
  )
)
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<View, CommandGroupProps>(
  ({ children, heading, style }, ref) => (
    <View
      ref={ref}
      style={[styles.group, style]}
    >
      {heading && (
        <Text style={styles.groupHeading}>
          {heading}
        </Text>
      )}
      {children}
    </View>
  )
)
CommandGroup.displayName = "CommandGroup"

const CommandSeparator = React.forwardRef<View, CommandSeparatorProps>(
  ({ style }, ref) => (
    <View
      ref={ref}
      style={[styles.separator, style]}
    />
  )
)
CommandSeparator.displayName = "CommandSeparator"

const CommandItem = React.forwardRef<TouchableOpacity, CommandItemProps>(
  ({ children, onSelect, disabled, style }, ref) => (
    <TouchableOpacity
      ref={ref}
      onPress={onSelect}
      disabled={disabled}
      style={[
        styles.item,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  )
)
CommandItem.displayName = "CommandItem"

const CommandShortcut = React.forwardRef<Text, CommandShortcutProps>(
  ({ children, style }, ref) => (
    <Text
      ref={ref}
      style={[styles.shortcut, style]}
    >
      {children}
    </Text>
  )
)
CommandShortcut.displayName = "CommandShortcut"

const styles = StyleSheet.create({
  command: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  dialogContent: {
    overflow: "hidden",
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dialogCommand: {
    height: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: "#000000",
  },
  list: {
    maxHeight: 300,
  },
  empty: {
    paddingVertical: 24,
    alignItems: "center",
  },
  group: {
    padding: 4,
  },
  groupHeading: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: 12,
    letterSpacing: 1,
    color: "#6B7280",
  },
})

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
}
