import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  style?: ViewStyle
}

interface PaginationItemProps {
  page: number
  isActive?: boolean
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

interface PaginationEllipsisProps {
  style?: ViewStyle
}

interface PaginationNextProps {
  onPress: () => void
  disabled?: boolean
  style?: ViewStyle
}

interface PaginationPreviousProps {
  onPress: () => void
  disabled?: boolean
  style?: ViewStyle
}

const PaginationItem = React.forwardRef<TouchableOpacity, PaginationItemProps>(
  ({ page, isActive, onPress, style, textStyle }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[
          styles.item,
          isActive && styles.itemActive,
          style,
        ]}
      >
        <Text style={[styles.itemText, isActive && styles.itemTextActive, textStyle]}>
          {page}
        </Text>
      </TouchableOpacity>
    )
  }
)
PaginationItem.displayName = "PaginationItem"

const PaginationEllipsis = React.forwardRef<View, PaginationEllipsisProps>(
  ({ style }, ref) => {
    return (
      <View ref={ref} style={[styles.ellipsis, style]}>
        <Text style={styles.ellipsisText}>...</Text>
      </View>
    )
  }
)
PaginationEllipsis.displayName = "PaginationEllipsis"

const PaginationNext = React.forwardRef<TouchableOpacity, PaginationNextProps>(
  ({ onPress, disabled, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[styles.next, disabled && styles.buttonDisabled, style]}
      >
        <Feather name="chevron-right" size={16} color={disabled ? "#9CA3AF" : "#374151"} />
      </TouchableOpacity>
    )
  }
)
PaginationNext.displayName = "PaginationNext"

const PaginationPrevious = React.forwardRef<TouchableOpacity, PaginationPreviousProps>(
  ({ onPress, disabled, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[styles.previous, disabled && styles.buttonDisabled, style]}
      >
        <Feather name="chevron-left" size={16} color={disabled ? "#9CA3AF" : "#374151"} />
      </TouchableOpacity>
    )
  }
)
PaginationPrevious.displayName = "PaginationPrevious"

const Pagination = React.forwardRef<View, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, style }, ref) => {
    const renderPageNumbers = () => {
      const items = []
      const maxVisiblePages = 5

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem
              key={i}
              page={i}
              isActive={i === currentPage}
              onPress={() => onPageChange(i)}
            />
          )
        }
      } else {
        // Always show first page
        items.push(
          <PaginationItem
            key={1}
            page={1}
            isActive={1 === currentPage}
            onPress={() => onPageChange(1)}
          />
        )

        if (currentPage > 3) {
          items.push(<PaginationEllipsis key="ellipsis1" />)
        }

        // Show pages around current page
        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
          items.push(
            <PaginationItem
              key={i}
              page={i}
              isActive={i === currentPage}
              onPress={() => onPageChange(i)}
            />
          )
        }

        if (currentPage < totalPages - 2) {
          items.push(<PaginationEllipsis key="ellipsis2" />)
        }

        // Always show last page
        items.push(
          <PaginationItem
            key={totalPages}
            page={totalPages}
            isActive={totalPages === currentPage}
            onPress={() => onPageChange(totalPages)}
          />
        )
      }

      return items
    }

    return (
      <View ref={ref} style={[styles.pagination, style]}>
        <PaginationPrevious
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <View style={styles.items}>{renderPageNumbers()}</View>
        <PaginationNext
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </View>
    )
  }
)
Pagination.displayName = "Pagination"

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  item: {
    minWidth: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  itemActive: {
    backgroundColor: "#F3F4F6",
  },
  itemText: {
    fontSize: 14,
    color: "#374151",
  },
  itemTextActive: {
    fontWeight: "500",
    color: "#111827",
  },
  ellipsis: {
    minWidth: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  ellipsisText: {
    fontSize: 14,
    color: "#6B7280",
  },
  next: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  previous: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
