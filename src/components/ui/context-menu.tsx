import * as React from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, ViewStyle, TextStyle, Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ContextMenuProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface ContextMenuTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface ContextMenuContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  style?: ViewStyle
}

interface ContextMenuItemProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  inset?: boolean
  style?: ViewStyle
}

interface ContextMenuCheckboxItemProps {
  children: React.ReactNode
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
  style?: ViewStyle
}

interface ContextMenuRadioItemProps {
  children: React.ReactNode
  value: string
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
}

interface ContextMenuLabelProps {
  children: React.ReactNode
  inset?: boolean
  style?: ViewStyle
}

interface ContextMenuSeparatorProps {
  style?: ViewStyle
}

interface ContextMenuShortcutProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface ContextMenuGroupProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface ContextMenuSubProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface ContextMenuSubTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  inset?: boolean
  style?: ViewStyle
}

interface ContextMenuSubContentProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  style?: ViewStyle
}

interface ContextMenuRadioGroupProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  style?: ViewStyle
}

const ContextMenu = ({ children, style }: ContextMenuProps) => {
  return (
    <View style={[styles.contextMenu, style]}>
      {children}
    </View>
  )
}

const ContextMenuTrigger = ({ children, onPress, style }: ContextMenuTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
    </TouchableOpacity>
  )
}

const ContextMenuContent = ({ children, visible, onClose, style }: ContextMenuContentProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={[styles.content, style]}>
          {children}
        </View>
      </Pressable>
    </Modal>
  )
}

const ContextMenuItem = ({ children, onPress, disabled, inset, style }: ContextMenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.item,
        inset && styles.itemInset,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  )
}

const ContextMenuCheckboxItem = ({ children, onPress, checked, disabled, style }: ContextMenuCheckboxItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.checkboxItem,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      <View style={styles.checkboxIndicator}>
        {checked && <Feather name="check" size={16} color="#FFFFFF" />}
      </View>
      {children}
    </TouchableOpacity>
  )
}

const ContextMenuRadioItem = ({ children, value, style, textStyle, onPress, checked, disabled }: ContextMenuRadioItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.radioItem,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      <View style={[styles.radio, checked && styles.radioChecked]}>
        {checked && <View style={styles.radioDot} />}
      </View>
      <Text style={[styles.radioLabel, disabled && styles.textDisabled, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const ContextMenuLabel = ({ children, inset, style }: ContextMenuLabelProps) => {
  return (
    <Text style={[styles.label, inset && styles.labelInset, style]}>
      {children}
    </Text>
  )
}

const ContextMenuSeparator = ({ style }: ContextMenuSeparatorProps) => {
  return <View style={[styles.separator, style]} />
}

const ContextMenuShortcut = ({ children, style }: ContextMenuShortcutProps) => {
  return (
    <Text style={[styles.shortcut, style]}>
      {children}
    </Text>
  )
}

const ContextMenuGroup = ({ children, style }: ContextMenuGroupProps) => {
  return (
    <View style={[styles.group, style]}>
      {children}
    </View>
  )
}

const ContextMenuSub = ({ children, style }: ContextMenuSubProps) => {
  return (
    <View style={[styles.sub, style]}>
      {children}
    </View>
  )
}

const ContextMenuSubTrigger = ({ children, onPress, disabled, inset, style }: ContextMenuSubTriggerProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.subTrigger,
        inset && styles.subTriggerInset,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {children}
      <Feather name="chevron-right" size={16} color="#6B7280" style={styles.subTriggerIcon} />
    </TouchableOpacity>
  )
}

const ContextMenuSubContent = ({ children, visible, onClose, style }: ContextMenuSubContentProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={[styles.subContent, style]}>
          {children}
        </View>
      </Pressable>
    </Modal>
  )
}

const ContextMenuRadioGroup = ({ children, value, onValueChange, style }: ContextMenuRadioGroupProps) => {
  return (
    <View style={[styles.radioGroup, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<ContextMenuRadioItemProps>, {
            checked: (child as React.ReactElement<ContextMenuRadioItemProps>).props.value === value,
            onPress: () => onValueChange?.((child as React.ReactElement<ContextMenuRadioItemProps>).props.value),
          })
        }
        return child
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  contextMenu: {
    width: "100%",
  },
  trigger: {
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minWidth: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  checkboxIndicator: {
    position: "absolute",
    left: 8,
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  radioIndicator: {
    position: "absolute",
    left: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
  },
  radioIndicatorInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6B7280",
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
    marginHorizontal: 4,
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: 12,
    letterSpacing: 1,
    color: "#6B7280",
  },
  group: {
    width: "100%",
  },
  sub: {
    width: "100%",
  },
  subTrigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  subTriggerInset: {
    paddingLeft: 32,
  },
  subTriggerIcon: {
    marginLeft: "auto",
  },
  subContent: {
    minWidth: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  radioGroup: {
    width: "100%",
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
  },
  radioChecked: {
    backgroundColor: "#6B7280",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  radioLabel: {
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  textDisabled: {
    opacity: 0.5,
  },
})

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
