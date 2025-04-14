import * as React from "react"
import { View, ScrollView, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"

export interface CarouselProps {
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
  style?: ViewStyle
  contentStyle?: ViewStyle
  showControls?: boolean
  autoPlay?: boolean
  interval?: number
  loop?: boolean
}

export interface CarouselItemProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface CarouselControlProps {
  onPress?: () => void
  disabled?: boolean
  style?: ViewStyle
}

const CarouselContext = React.createContext<{
  currentIndex: number
  totalItems: number
  scrollToIndex: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = ({
  children,
  orientation = "horizontal",
  style,
  contentStyle,
  showControls = true,
  autoPlay = false,
  interval = 5000,
  loop = true,
}: CarouselProps) => {
  const scrollViewRef = React.useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [contentWidth, setContentWidth] = React.useState(0)
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0)
  
  const childrenArray = React.Children.toArray(children)
  const totalItems = childrenArray.length
  
  const canScrollPrev = loop || currentIndex > 0
  const canScrollNext = loop || currentIndex < totalItems - 1
  
  const scrollToIndex = (index: number) => {
    if (index < 0) {
      if (loop) {
        index = totalItems - 1
      } else {
        return
      }
    } else if (index >= totalItems) {
      if (loop) {
        index = 0
      } else {
        return
      }
    }
    
    const itemWidth = contentWidth / totalItems
    scrollViewRef.current?.scrollTo({
      x: index * itemWidth,
      y: 0,
      animated: true,
    })
    
    setCurrentIndex(index)
  }
  
  const scrollPrev = () => {
    scrollToIndex(currentIndex - 1)
  }
  
  const scrollNext = () => {
    scrollToIndex(currentIndex + 1)
  }
  
  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const itemWidth = contentSize.width / totalItems
    const newIndex = Math.round(contentOffset.x / itemWidth)
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }
  
  const handleContentSizeChange = (width: number) => {
    setContentWidth(width)
  }
  
  const handleLayout = (event: any) => {
    setScrollViewWidth(event.nativeEvent.layout.width)
  }
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (autoPlay) {
      timer = setInterval(() => {
        scrollNext()
      }, interval)
    }
    
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [autoPlay, interval, currentIndex, totalItems])
  
  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
        totalItems,
        scrollToIndex,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <View style={[styles.container, style]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={orientation === "horizontal"}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleLayout}
          scrollEventThrottle={16}
          contentContainerStyle={[
            orientation === "horizontal" ? styles.horizontalContent : styles.verticalContent,
            contentStyle,
          ]}
        >
          {children}
        </ScrollView>
        
        {showControls && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </View>
    </CarouselContext.Provider>
  )
}

const CarouselItem = ({ children, style }: CarouselItemProps) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  )
}

const CarouselPrevious = ({ style }: CarouselControlProps) => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  
  return (
    <TouchableOpacity
      style={[styles.control, styles.prevButton, style]}
      onPress={scrollPrev}
      disabled={!canScrollPrev}
    >
      <Feather name="chevron-left" size={24} color={canScrollPrev ? "#000" : "#ccc"} />
    </TouchableOpacity>
  )
}

const CarouselNext = ({ style }: CarouselControlProps) => {
  const { scrollNext, canScrollNext } = useCarousel()
  
  return (
    <TouchableOpacity
      style={[styles.control, styles.nextButton, style]}
      onPress={scrollNext}
      disabled={!canScrollNext}
    >
      <Feather name="chevron-right" size={24} color={canScrollNext ? "#000" : "#ccc"} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  horizontalContent: {
    flexDirection: "row",
  },
  verticalContent: {
    flexDirection: "column",
  },
  item: {
    flex: 1,
  },
  control: {
    position: "absolute",
    top: "50%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  prevButton: {
    left: 10,
    transform: [{ translateY: -20 }],
  },
  nextButton: {
    right: 10,
    transform: [{ translateY: -20 }],
  },
})

export { Carousel, CarouselItem, CarouselPrevious, CarouselNext }
