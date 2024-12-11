import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

type FormNumberFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  helperText?: string
}

export default function FormNumberField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  min,
  max,
  step = 1,
  disabled,
  helperText
}: FormNumberFieldProps<T>) {
  const {
    field: { onChange, value, ...field },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    onChange(value)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        {...field}
        id={name}
        type='number'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(error && 'border-destructive')}
      />
      {helperText && <p className='text-xs text-muted-foreground'>{helperText}</p>}
      {error?.message && <p className='text-xs text-destructive'>{error.message as string}</p>}
    </div>
  )
}
