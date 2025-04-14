import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native"

interface TableProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface TableHeaderProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface TableBodyProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface TableRowProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface TableCellProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface TableHeadProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const Table = React.forwardRef<View, TableProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.table, style]} {...props}>
    {children}
  </View>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<View, TableHeaderProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.header, style]} {...props}>
    {children}
  </View>
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<View, TableBodyProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.body, style]} {...props}>
    {children}
  </View>
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<View, TableRowProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.row, style]} {...props}>
    {children}
  </View>
))
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef<View, TableCellProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.cell, style]} {...props}>
    <Text style={styles.cellText}>{children}</Text>
  </View>
))
TableCell.displayName = "TableCell"

const TableHead = React.forwardRef<View, TableHeadProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.head, style]} {...props}>
    <Text style={styles.headText}>{children}</Text>
  </View>
))
TableHead.displayName = "TableHead"

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
  },
  header: {
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  body: {
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cell: {
    flex: 1,
    padding: 12,
  },
  cellText: {
    fontSize: 14,
    color: "#374151",
  },
  head: {
    flex: 1,
    padding: 12,
  },
  headText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
})

export { Table, TableHeader, TableBody, TableRow, TableCell, TableHead }
