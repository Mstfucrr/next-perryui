'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

// ** Zod schema for form validation
const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

type LoginFormInputs = z.infer<typeof loginSchema>

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  })
  const { login, user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) return router.push('/dashboard')
  }, [user, router])

  const onSubmit = (data: LoginFormInputs) => {
    setIsLoading(true)
    toast.loading('Loading...')
    setTimeout(() => {
      toast.dismiss()
      toast.success('Welcome back! Login successful.')
      setIsLoading(false)
      login({
        email: data.email,
        password: data.password
      })
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-md rounded-lg border border-green-200 bg-white p-8 shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-4xl font-bold text-green-800'>Welcome Back</CardTitle>
          <CardDescription className='mt-2 text-green-600'>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-green-700'>
                Email Address
              </label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                {...register('email')}
                className={`mt-1 rounded-md border p-2 ${errors.email ? 'border-red-500' : 'border-green-300'}`}
              />
              {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-green-700'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                {...register('password')}
                className={`mt-1 rounded-md border p-2 ${errors.password ? 'border-red-500' : 'border-green-300'}`}
              />
              {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <Button isLoading={isLoading} type='submit' className='w-full text-lg'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
