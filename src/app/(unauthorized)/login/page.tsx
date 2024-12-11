'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Form } from '@/components/ui/form'
import FormInputField from '@/components/FormInputField'
import CustomImage from '@/components/image'

// ** Zod schema for form validation
const loginSchema = z.object({
  email: z.string().min(1, { message: 'E-posta adresi girilmedi' }).email({ message: 'Geçersiz e-posta formatı' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır' })
})

type LoginFormInputs = z.infer<typeof loginSchema>

const LoginPage = () => {
  const { login, user, isPending } = useAuth()
  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { handleSubmit, control } = loginForm

  const router = useRouter()

  const onSubmit = (data: LoginFormInputs) => {
    login({
      email: data.email,
      password: data.password
    })
  }

  useEffect(() => {
    if (user) return router.push('/dashboard')
  }, [user, router])

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex w-full max-w-screen-lg justify-center'>
        <Card className='flex w-full flex-col justify-center rounded-lg border border-green-200 bg-white shadow-lg max-lg:max-w-md lg:w-full lg:p-8'>
          <CardHeader className='text-center'>
            <CardTitle className='text-4xl font-bold text-green-800'>
              <div className='flex items-center justify-center'>
                <span className='text-4xl font-bold text-green-800'>PERRY UI</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Email Field */}
                <FormInputField name='email' control={control} label='E-posta Adresi' placeholder='you@example.com' />

                {/* Password Field */}
                <FormInputField
                  name='password'
                  control={control}
                  label='Password'
                  placeholder='••••••••'
                  type='password'
                />

                <Button isLoading={isPending} className='w-full text-lg'>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className='hidden w-full rounded-lg border border-green-200 bg-white p-8 shadow-lg lg:block'>
          <CustomImage src='/logo.png' alt='logo' className='size-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
