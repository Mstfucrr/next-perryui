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

// ** Zod schema for form validation
const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
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
      <Card className='w-full max-w-md rounded-lg border border-green-200 bg-white p-8 shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-4xl font-bold text-green-800'>Welcome Back</CardTitle>
          <CardDescription className='mt-2 text-green-600'>Login to your account</CardDescription>
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
    </div>
  )
}

export default LoginPage
