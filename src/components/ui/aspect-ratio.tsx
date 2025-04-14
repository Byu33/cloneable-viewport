import * as React from "react"
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from "react-native"

export interface AspectRatioProps {
  ratio?: number
  children: React.ReactNode
  style?: ViewStyle
}

const AspectRatio = ({ ratio = 16 / 9, children, style }: AspectRatioProps) => {
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setWidth(width)
    setHeight(width / ratio)
  }

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <View style={[styles.content, { height }]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    width: "100%",
  },
})

export { AspectRatio }
