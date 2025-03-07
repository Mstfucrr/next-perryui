'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Form } from '@/components/ui/form'
import FormInputField from '@/components/FormInputField'
import CustomImage from '@/components/image'
import { LoginFormInputs } from '@/modules/auth/types'
import { loginSchema } from '@/modules/auth/services/schema'

const LoginView = () => {
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
    // if (user) return router.push('/dashboard')
    if (user) console.log('user', user, router)
  }, [user, router])

  return (
    <div className='flex h-1/2 min-h-screen items-center justify-center'>
      <div className='flex w-full justify-center rounded-lg bg-white shadow-md lg:max-w-5xl'>
        <Card className='flex w-full flex-col border-0 shadow-none max-lg:max-w-md lg:w-full'>
          <CardHeader className='rounded-tl-lg bg-primary p-4 text-center'>
            <CardTitle className='flex w-full items-center justify-center text-4xl font-extrabold text-white'>
              PERRY
            </CardTitle>
          </CardHeader>
          <CardContent className='flex size-full lg:p-8'>
            <Form {...loginForm}>
              <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
                {/* Email Field */}
                <div className='flex flex-1 flex-col gap-4'>
                  <FormInputField name='email' control={control} label='E-posta Adresi' placeholder='you@example.com' />

                  {/* Password Field */}
                  <FormInputField
                    name='password'
                    control={control}
                    label='Şifre'
                    placeholder='••••••••'
                    type='password'
                  />
                </div>
                <Button isLoading={isPending} className='w-full self-end text-lg font-bold'>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className='hidden max-h-[450px] w-full lg:block'>
          <CustomImage src='/login.png' alt='logo' className='size-full rounded-r-lg object-cover' />
        </div>
      </div>
    </div>
  )
}

export default LoginView
