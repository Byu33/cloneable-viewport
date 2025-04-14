import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated, Dimensions, Modal } from "react-native"
import { Feather } from "@expo/vector-icons"

// Constants
const SIDEBAR_WIDTH = 256 // 16rem
const SIDEBAR_WIDTH_MOBILE = 288 // 18rem
const SIDEBAR_WIDTH_ICON = 48 // 3rem

// Context
type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

// Provider
interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: ViewStyle
}

const SidebarProvider = React.forwardRef<View, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(false)
    const [openMobile, setOpenMobile] = React.useState(false)

    // Check if device is mobile
    React.useEffect(() => {
      const checkIfMobile = () => {
        const { width } = Dimensions.get("window")
        setIsMobile(width < 768) // md breakpoint
      }

      checkIfMobile()
      const subscription = Dimensions.addEventListener("change", checkIfMobile)
      return () => subscription.remove()
    }, [])

    // Internal state
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }
      },
      [setOpenProp, open]
    )

    // Toggle sidebar
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // State for styling
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <View
          style={[styles.sidebarWrapper, style]}
          ref={ref}
          {...props}
        >
          {children}
        </View>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

// Main Sidebar Component
interface SidebarProps {
  children: React.ReactNode
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  style?: ViewStyle
}

const Sidebar = React.forwardRef<View, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <View
          style={[
            styles.sidebar,
            { width: SIDEBAR_WIDTH },
            style
          ]}
          ref={ref}
          {...props}
        >
          {children}
        </View>
      )
    }

    if (isMobile) {
      return (
        <Modal
          visible={openMobile}
          transparent
          animationType="slide"
          onRequestClose={() => setOpenMobile(false)}
        >
          <View style={styles.mobileOverlay}>
            <TouchableOpacity
              style={styles.mobileBackdrop}
              onPress={() => setOpenMobile(false)}
            />
            <View
              style={[
                styles.mobileSidebar,
                { width: SIDEBAR_WIDTH_MOBILE },
                side === "right" && styles.mobileSidebarRight
              ]}
            >
              {children}
            </View>
          </View>
        </Modal>
      )
    }

    return (
      <View
        ref={ref}
        style={[
          styles.sidebarContainer,
          state === "collapsed" && collapsible === "offcanvas" && styles.sidebarHidden,
          state === "collapsed" && collapsible === "icon" && { width: SIDEBAR_WIDTH_ICON },
          side === "right" && styles.sidebarRight,
          style
        ]}
        {...props}
      >
        <View
          style={[
            styles.sidebar,
            variant === "floating" && styles.sidebarFloating,
            variant === "inset" && styles.sidebarInset,
            state === "collapsed" && collapsible === "icon" && styles.sidebarIcon,
            { width: state === "collapsed" && collapsible === "icon" ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH }
          ]}
        >
          {children}
        </View>
      </View>
    )
  }
)
Sidebar.displayName = "Sidebar"

// Sidebar Trigger
interface SidebarTriggerProps {
  onPress?: () => void
  style?: ViewStyle
}

const SidebarTrigger = React.forwardRef<TouchableOpacity, SidebarTriggerProps>(
  ({ onPress, style, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.trigger, style]}
        onPress={() => {
          onPress?.()
          toggleSidebar()
        }}
        {...props}
      >
        <Feather name="menu" size={20} color="#000000" />
      </TouchableOpacity>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

// Sidebar Content
interface SidebarContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

const SidebarContent = React.forwardRef<View, SidebarContentProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.content, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
SidebarContent.displayName = "SidebarContent"

// Sidebar Header
interface SidebarHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

const SidebarHeader = React.forwardRef<View, SidebarHeaderProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.header, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

// Sidebar Footer
interface SidebarFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

const SidebarFooter = React.forwardRef<View, SidebarFooterProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.footer, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

// Sidebar Separator
interface SidebarSeparatorProps {
  style?: ViewStyle
}

const SidebarSeparator = React.forwardRef<View, SidebarSeparatorProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.separator, style]}
        {...props}
      />
    )
  }
)
SidebarSeparator.displayName = "SidebarSeparator"

// Sidebar Menu
interface SidebarMenuProps {
  children: React.ReactNode
  style?: ViewStyle
}

const SidebarMenu = React.forwardRef<View, SidebarMenuProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.menu, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
SidebarMenu.displayName = "SidebarMenu"

// Sidebar Menu Item
interface SidebarMenuItemProps {
  children: React.ReactNode
  style?: ViewStyle
}

const SidebarMenuItem = React.forwardRef<View, SidebarMenuItemProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.menuItem, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

// Sidebar Menu Button
interface SidebarMenuButtonProps {
  children: React.ReactNode
  onPress?: () => void
  isActive?: boolean
  style?: ViewStyle
}

const SidebarMenuButton = React.forwardRef<TouchableOpacity, SidebarMenuButtonProps>(
  ({ children, onPress, isActive, style, ...props }, ref) => {
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
      <TouchableOpacity
        ref={ref}
        style={[
          styles.menuButton,
          isActive && styles.menuButtonActive,
          isCollapsed && styles.menuButtonCollapsed,
          style
        ]}
        onPress={onPress}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

// Styles
const styles = StyleSheet.create({
  sidebarWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarContainer: {
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  sidebarHidden: {
    transform: [{ translateX: -SIDEBAR_WIDTH }],
  },
  sidebarRight: {
    left: "auto",
    right: 0,
  },
  sidebar: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  sidebarFloating: {
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sidebarInset: {
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sidebarIcon: {
    padding: 8,
  },
  mobileOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mobileBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mobileSidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
  },
  mobileSidebarRight: {
    left: "auto",
    right: 0,
  },
  trigger: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 8,
  },
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  footer: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  menu: {
    padding: 4,
  },
  menuItem: {
    marginBottom: 4,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
  },
  menuButtonActive: {
    backgroundColor: "#F3F4F6",
  },
  menuButtonCollapsed: {
    justifyContent: "center",
    padding: 8,
  },
})

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
