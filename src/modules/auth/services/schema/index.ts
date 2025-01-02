import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'E-posta adresi girilmedi' }).email({ message: 'Geçersiz e-posta formatı' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır' })
})
