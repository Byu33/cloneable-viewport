import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"

// Types
type ToastType = "default" | "success" | "error" | "warning" | "info"

interface ToastProps {
  id: string
  type?: ToastType
  title?: string
  description?: string
  duration?: number
  onDismiss?: () => void
  style?: ViewStyle
}

interface ToasterProps {
  position?: "top" | "bottom"
  style?: ViewStyle
}

// Context
type ToasterContext = {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
}

const ToasterContext = React.createContext<ToasterContext | null>(null)

function useToaster() {
  const context = React.useContext(ToasterContext)
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider.")
  }
  return context
}

// Provider
interface ToasterProviderProps {
  children: React.ReactNode
  style?: ViewStyle
}

const ToasterProvider = React.forwardRef<View, ToasterProviderProps>(
  ({ children, style, ...props }, ref) => {
    const [toasts, setToasts] = React.useState<ToastProps[]>([])

    const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { ...toast, id }])

      if (toast.duration !== 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, toast.duration || 5000)
      }
    }, [])

    const removeToast = React.useCallback((id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const value = React.useMemo(
      () => ({
        toasts,
        addToast,
        removeToast,
      }),
      [toasts, addToast, removeToast]
    )

    return (
      <ToasterContext.Provider value={value}>
        <View style={[styles.provider, style]} ref={ref} {...props}>
          {children}
        </View>
      </ToasterContext.Provider>
    )
  }
)
ToasterProvider.displayName = "ToasterProvider"

// Toast Component
const Toast = React.forwardRef<View, ToastProps>(
  ({ type = "default", title, description, onDismiss, style, ...props }, ref) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }, [])

    const getIcon = () => {
      switch (type) {
        case "success":
          return "check-circle"
        case "error":
          return "x-circle"
        case "warning":
          return "alert-triangle"
        case "info":
          return "info"
        default:
          return "bell"
      }
    }

    const getColor = () => {
      switch (type) {
        case "success":
          return "#22C55E"
        case "error":
          return "#EF4444"
        case "warning":
          return "#F59E0B"
        case "info":
          return "#3B82F6"
        default:
          return "#6B7280"
      }
    }

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.toast,
          { opacity: fadeAnim },
          style
        ]}
        {...props}
      >
        <View style={styles.toastContent}>
          <Feather name={getIcon()} size={20} color={getColor()} style={styles.icon} />
          <View style={styles.textContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
          <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
            <Feather name="x" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
)
Toast.displayName = "Toast"

// Toaster Component
const Toaster = React.forwardRef<View, ToasterProps>(
  ({ position = "top", style, ...props }, ref) => {
    const { toasts, removeToast } = useToaster()

    return (
      <View
        ref={ref}
        style={[
          styles.toaster,
          position === "top" ? styles.toasterTop : styles.toasterBottom,
          style
        ]}
        {...props}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </View>
    )
  }
)
Toaster.displayName = "Toaster"

// Styles
const styles = StyleSheet.create({
  provider: {
    flex: 1,
  },
  toaster: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 100,
  },
  toasterTop: {
    top: 0,
  },
  toasterBottom: {
    bottom: 0,
  },
  toast: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#6B7280",
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
})

export { Toaster, ToasterProvider, useToaster }
