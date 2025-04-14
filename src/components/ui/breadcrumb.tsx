import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

export interface BreadcrumbProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface BreadcrumbListProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface BreadcrumbItemProps {
  children: React.ReactNode
  style?: ViewStyle
}

export interface BreadcrumbLinkProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

export interface BreadcrumbPageProps {
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode
  style?: ViewStyle
}

export interface BreadcrumbEllipsisProps {
  style?: ViewStyle
}

const Breadcrumb = ({ children, style }: BreadcrumbProps) => {
  return (
    <View style={[styles.breadcrumb, style]}>
      {children}
    </View>
  )
}

const BreadcrumbList = ({ children, style }: BreadcrumbListProps) => {
  return (
    <View style={[styles.list, style]}>
      {children}
    </View>
  )
}

const BreadcrumbItem = ({ children, style }: BreadcrumbItemProps) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  )
}

const BreadcrumbLink = ({ children, onPress, style, textStyle }: BreadcrumbLinkProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.link, style]}>
      <Text style={[styles.linkText, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const BreadcrumbPage = ({ children, style, textStyle }: BreadcrumbPageProps) => {
  return (
    <Text 
      style={[styles.page, textStyle, style]}
    >
      {children}
    </Text>
  )
}

const BreadcrumbSeparator = ({ children, style }: BreadcrumbSeparatorProps) => {
  return (
    <View style={[styles.separator, style]}>
      {children ?? <Feather name="chevron-right" size={14} color="#6B7280" />}
    </View>
  )
}

const BreadcrumbEllipsis = ({ style }: BreadcrumbEllipsisProps) => {
  return (
    <View style={[styles.ellipsis, style]}>
      <Feather name="more-horizontal" size={16} color="#6B7280" />
    </View>
  )
}

const styles = StyleSheet.create({
  breadcrumb: {
    width: "100%",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  link: {
    padding: 4,
  },
  linkText: {
    fontSize: 14,
    color: "#6B7280",
  },
  page: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#111827",
  },
  separator: {
    marginHorizontal: 4,
  },
  ellipsis: {
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
})

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
