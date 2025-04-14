import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Animated,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: ViewStyle
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  inset?: boolean
  style?: ViewStyle
}

interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
  style?: ViewStyle
}

interface DropdownMenuRadioItemProps {
  children: React.ReactNode
  onPress?: () => void
  checked?: boolean
  disabled?: boolean
  value?: string
  style?: ViewStyle
}

interface DropdownMenuLabelProps {
  children: React.ReactNode
  inset?: boolean
  style?: ViewStyle
}

interface DropdownMenuSeparatorProps {
  style?: ViewStyle
}

interface DropdownMenuShortcutProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DropdownMenuGroupProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DropdownMenuSubProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DropdownMenuSubTriggerProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  inset?: boolean
  style?: ViewStyle
}

interface DropdownMenuSubContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DropdownMenuRadioGroupProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  style?: ViewStyle
}

const DropdownMenu = ({ children, open, onOpenChange, style }: DropdownMenuProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      {children}
    </Modal>
  )
}

const DropdownMenuTrigger = ({ children, onPress, style }: DropdownMenuTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
    </TouchableOpacity>
  )
}

const DropdownMenuContent = ({ children, style }: DropdownMenuContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  )
}

const DropdownMenuItem = ({ children, onPress, disabled, inset, style }: DropdownMenuItemProps) => {
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

const DropdownMenuCheckboxItem = ({ children, onPress, checked, disabled, style }: DropdownMenuCheckboxItemProps) => {
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
        {checked && <Feather name="check" size={16} color="#000000" />}
      </View>
      {children}
    </TouchableOpacity>
  )
}

const DropdownMenuRadioItem = ({ children, onPress, checked, disabled, style }: DropdownMenuRadioItemProps) => {
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
      {children}
    </TouchableOpacity>
  )
}

const DropdownMenuLabel = ({ children, inset, style }: DropdownMenuLabelProps) => {
  return (
    <Text style={[styles.label, inset && styles.labelInset, style]}>
      {children}
    </Text>
  )
}

const DropdownMenuSeparator = ({ style }: DropdownMenuSeparatorProps) => {
  return <View style={[styles.separator, style]} />
}

const DropdownMenuShortcut = ({ children, style }: DropdownMenuShortcutProps) => {
  return (
    <Text style={[styles.shortcut, style]}>
      {children}
    </Text>
  )
}

const DropdownMenuGroup = ({ children, style }: DropdownMenuGroupProps) => {
  return (
    <View style={[styles.group, style]}>
      {children}
    </View>
  )
}

const DropdownMenuSub = ({ children, style }: DropdownMenuSubProps) => {
  return (
    <View style={[styles.sub, style]}>
      {children}
    </View>
  )
}

const DropdownMenuSubTrigger = ({ children, onPress, disabled, inset, style }: DropdownMenuSubTriggerProps) => {
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

const DropdownMenuSubContent = ({ children, style }: DropdownMenuSubContentProps) => {
  return (
    <View style={[styles.subContent, style]}>
      {children}
    </View>
  )
}

const DropdownMenuRadioGroup = ({ children, value, onValueChange, style }: DropdownMenuRadioGroupProps) => {
  return (
    <View style={[styles.radioGroup, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<DropdownMenuRadioItemProps>, {
            checked: (child as React.ReactElement<DropdownMenuRadioItemProps>).props.value === value,
            onPress: () => {
              const itemValue = (child as React.ReactElement<DropdownMenuRadioItemProps>).props.value;
              if (itemValue) onValueChange?.(itemValue);
            },
          })
        }
        return child
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  trigger: {
    width: '100%',
  },
  content: {
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  checkboxIndicator: {
    position: 'absolute',
    left: 8,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChecked: {
    backgroundColor: '#6B7280',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
    marginHorizontal: 4,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: 12,
    letterSpacing: 1,
    color: '#6B7280',
  },
  group: {
    width: '100%',
  },
  sub: {
    width: '100%',
  },
  subTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  subTriggerInset: {
    paddingLeft: 32,
  },
  subTriggerIcon: {
    marginLeft: 'auto',
  },
  subContent: {
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  radioGroup: {
    width: '100%',
  },
})

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
