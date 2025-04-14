import React, { forwardRef } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native'
import { ChevronDown } from 'lucide-react-native'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

interface SelectTriggerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

interface SelectContentProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  visible: boolean
  onRequestClose: () => void
}

interface SelectItemProps {
  value: string
  onSelect?: (value: string) => void
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  selected?: boolean
}

interface SelectLabelProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}

interface SelectSeparatorProps {
  style?: StyleProp<ViewStyle>
}

const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (newValue: string) => {
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <View>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<SelectTriggerProps>, {
              onPress: () => setOpen(true),
            })
          }
          if (child.type === SelectContent) {
            return React.cloneElement(child as React.ReactElement<SelectContentProps>, {
              visible: open,
              onRequestClose: () => setOpen(false),
              children: React.Children.map(child.props.children, (contentChild) => {
                if (React.isValidElement(contentChild) && contentChild.type === SelectItem) {
                  const typedChild = contentChild as React.ReactElement<SelectItemProps>
                  return React.cloneElement(typedChild, {
                    onSelect: handleSelect,
                    selected: typedChild.props.value === value,
                  })
                }
                return contentChild
              }),
            })
          }
        }
        return child
      })}
    </View>
  )
}

const SelectTrigger = forwardRef<TouchableOpacity, SelectTriggerProps>(
  ({ children, style, onPress }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.trigger, style]}
        activeOpacity={0.7}
      >
        <View style={styles.triggerContent}>
          {children}
          <ChevronDown size={16} color="#666" />
        </View>
      </TouchableOpacity>
    )
  }
)

const SelectContent = ({ children, style, visible, onRequestClose }: SelectContentProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onRequestClose}
      >
        <View style={[styles.content, style]}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const SelectItem = ({ value, onSelect, children, style, selected }: SelectItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.item, selected && styles.itemSelected, style]}
      onPress={() => onSelect?.(value)}
      activeOpacity={0.7}
    >
      <Text style={[styles.itemText, selected && styles.itemTextSelected]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const SelectLabel = ({ children, style }: SelectLabelProps) => {
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  )
}

const SelectSeparator = ({ style }: SelectSeparatorProps) => {
  return <View style={[styles.separator, style]} />
}

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 8,
    minWidth: 200,
    maxWidth: '80%',
    maxHeight: '80%',
  },
  item: {
    padding: 10,
    borderRadius: 4,
  },
  itemSelected: {
    backgroundColor: '#f1f5f9',
  },
  itemText: {
    fontSize: 14,
    color: '#1e293b',
  },
  itemTextSelected: {
    color: '#0f172a',
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
})

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
}
