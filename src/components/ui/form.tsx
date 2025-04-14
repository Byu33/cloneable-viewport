import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

interface FormItemProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const FormItem = React.forwardRef<View, FormItemProps>(({ style, children }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View ref={ref} style={[styles.formItem, style]}>
        {children}
      </View>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

interface FormLabelProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}

const FormLabel = React.forwardRef<Text, FormLabelProps>(({ style, children }, ref) => {
  const { error, formItemId } = useFormField()

  const combinedStyle: StyleProp<TextStyle> = [
    styles.label,
    error && styles.labelError,
    style,
  ]

  return (
    <Label
      ref={ref}
      style={combinedStyle}
      nativeID={formItemId}
    >
      {children}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"

interface FormControlProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const FormControl = React.forwardRef<View, FormControlProps>(({ style, children }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <View
      ref={ref}
      nativeID={formItemId}
      accessibilityLabel={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      accessibilityState={{ disabled: !!error }}
      style={style}
    >
      {children}
    </View>
  )
})
FormControl.displayName = "FormControl"

interface FormDescriptionProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}

const FormDescription = React.forwardRef<Text, FormDescriptionProps>(({ style, children }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <Text
      ref={ref}
      nativeID={formDescriptionId}
      style={[styles.description, style]}
    >
      {children}
    </Text>
  )
})
FormDescription.displayName = "FormDescription"

interface FormMessageProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

const FormMessage = React.forwardRef<Text, FormMessageProps>(({ style, children }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <Text
      ref={ref}
      nativeID={formMessageId}
      style={[styles.message, style]}
    >
      {body}
    </Text>
  )
})
FormMessage.displayName = "FormMessage"

const styles = StyleSheet.create({
  formItem: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  labelError: {
    color: "#ef4444",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ef4444",
    marginTop: 4,
  },
})

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
