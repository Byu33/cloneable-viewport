import React from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  Pressable,
} from 'react-native'
import { Feather } from "@expo/vector-icons"

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: ViewStyle
}

interface DialogContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DialogHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DialogFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DialogTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

interface DialogDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

interface DialogCloseProps {
  children: React.ReactNode
  style?: ViewStyle
  onPress?: () => void
}

const Dialog = ({ children, open, onOpenChange, style }: DialogProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <View style={[styles.overlay, style]}>
        {children}
      </View>
    </Modal>
  )
}

const DialogContent = ({ children, style }: DialogContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  )
}

const DialogHeader = ({ children, style }: DialogHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  )
}

const DialogFooter = ({ children, style }: DialogFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  )
}

const DialogTitle = ({ children, style }: DialogTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  )
}

const DialogDescription = ({ children, style }: DialogDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  )
}

const DialogClose = ({ children, style, onPress }: DialogCloseProps) => {
  return (
    <TouchableOpacity
      style={[styles.closeButton, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 500,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
})

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
