import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native'

interface DrawerProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: ViewStyle
}

interface DrawerContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DrawerHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DrawerFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface DrawerTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

interface DrawerDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

interface DrawerCloseProps {
  children: React.ReactNode
  style?: ViewStyle
  onPress?: () => void
}

const SCREEN_HEIGHT = Dimensions.get('window').height
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.7

const Drawer = ({ children, open, onOpenChange, style }: DrawerProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange?.(false)}
    >
      {children}
    </Modal>
  )
}

const DrawerContent = ({ children, style }: DrawerContentProps) => {
  const pan = useRef(new Animated.ValueXY()).current
  const [isOpen, setIsOpen] = useState(true)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({ x: 0, y: gestureState.dy })
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(pan, {
            toValue: { x: 0, y: DRAWER_HEIGHT },
            duration: 200,
            useNativeDriver: true,
          }).start(() => setIsOpen(false))
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start()
        }
      },
    })
  ).current

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.content,
          style,
          {
            transform: [{ translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </View>
  )
}

const DrawerHeader = ({ children, style }: DrawerHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  )
}

const DrawerFooter = ({ children, style }: DrawerFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  )
}

const DrawerTitle = ({ children, style }: DrawerTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  )
}

const DrawerDescription = ({ children, style }: DrawerDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  )
}

const DrawerClose = ({ children, style, onPress }: DrawerCloseProps) => {
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
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: DRAWER_HEIGHT,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 100,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
