import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'E-posta adresi girilmedi' }).email({ message: 'Geçersiz e-posta formatı' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır' })
})

export const registerSchema = z
  .object({
    email: z.string().min(1, { message: 'E-posta adresi girilmedi' }).email({ message: 'Geçersiz e-posta formatı' }),
    password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır' }),
    confirmPassword: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Şifreler eşleşmiyor',
        path: ['confirmPassword'] // path to the field that has the issue
      })
    }
  })
