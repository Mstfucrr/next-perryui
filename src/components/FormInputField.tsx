import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { cn } from '@/lib/utils'
import { InputHTMLAttributes } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

interface FormInputFieldProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
  type?: string
  placeholder?: string
  formItemClassName?: string
}

export default function FormInputField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  formItemClassName,
  ...props
}: FormInputFieldProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({ name, control })

  return (
    <FormItem className={formItemClassName}>
      {label && (
        <FormLabel htmlFor={name} className={cn('text-sm font-medium', error && 'text-red-500')}>
          {label}
        </FormLabel>
      )}
      <FormControl>
        {type === 'password' ? (
          <PasswordInput
            {...field}
            {...props}
            placeholder={placeholder}
            className={cn('w-full', error && 'border-red-500')}
          />
        ) : (
          <Input
            {...field}
            {...props}
            type={type}
            placeholder={placeholder}
            className={cn('w-full', error && 'border-red-500')}
          />
        )}
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  )
}
