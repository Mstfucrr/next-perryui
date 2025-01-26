import ErrorBoundary from '@/components/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'
import { PermissionsProvider } from '@/context/PermissionsContext'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QueryClientWrapper from './QueryClientProvider'

const ThemeDropDown = dynamic(() => import('@/components/ThemeDropDown'), { ssr: false })

export const metadata: Metadata = {
  title: 'Perry UI',
  description: 'Perry UI'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='tr'>
      <body className='relative antialiased'>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <QueryClientWrapper>
              <AuthProvider>
                <ThemeDropDown className='absolute right-5 top-5' />
                <PermissionsProvider>
                  {children}
                  <ToastContainer autoClose={2000} />
                </PermissionsProvider>
              </AuthProvider>
            </QueryClientWrapper>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
