'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

// ** Zod schema for form validation
const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

type LoginFormInputs = z.infer<typeof loginSchema>

const LoginPage = () => {
  // ** Initialize react-hook-form with Zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  })

  // ** Handle form submit
  const onSubmit = (data: LoginFormInputs) => {
    toast('Login form submitted', { type: 'success' })
    console.log(data)
  }
  return (
    <Card className='mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            {/* Email Field */}
            <div className='space-y-2'>
              <label htmlFor='email'>Email</label>
              <Input id='email' type='email' placeholder='m@example.com' {...register('email')} />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label htmlFor='password'>Password</label>
              <Input id='password' type='password' {...register('password')} />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginPage
