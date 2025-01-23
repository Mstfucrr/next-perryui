import ErrorBoundary from '@/components/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'
import { PermissionsProvider } from '@/context/PermissionsContext'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QueryClientWrapper from './QueryClientProvider'

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
      <body className='antialiased'>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <QueryClientWrapper>
              <AuthProvider>
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
