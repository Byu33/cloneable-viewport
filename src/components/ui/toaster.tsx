import * as React from "react"
import { View, StyleSheet, Modal, Animated, Dimensions } from "react-native"
import { Toast, ToastProps } from "./toast"

interface ToasterProps {
  position?: "top" | "bottom"
  style?: any
}

interface ToastState extends ToastProps {
  id: string
}

export const ToasterContext = React.createContext<{
  toasts: ToastState[]
  addToast: (toast: Omit<ToastState, "id">) => void
  removeToast: (id: string) => void
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})

export const useToaster = () => React.useContext(ToasterContext)

export const ToasterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastState[]>([])

  const addToast = React.useCallback((toast: Omit<ToastState, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToasterContext.Provider>
  )
}

export const Toaster: React.FC<ToasterProps> = ({ position = "bottom", style }) => {
  const { toasts, removeToast } = useToaster()
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: toasts.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [toasts.length])

  return (
    <Modal
      transparent
      visible={toasts.length > 0}
      animationType="none"
      onRequestClose={() => {}}
    >
      <Animated.View
        style={[
          styles.container,
          position === "top" ? styles.topContainer : styles.bottomContainer,
          { opacity: fadeAnim },
          style,
        ]}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
  },
  topContainer: {
    top: 0,
  },
  bottomContainer: {
    bottom: 0,
  },
})
