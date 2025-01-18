import type { Metadata } from 'next'
import '@/styles/globals.css'
import QueryClientWrapper from './QueryClientProvider'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/context/AuthContext'
import ErrorBoundary from '@/components/error-boundary'

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
                {children}
                <ToastContainer autoClose={2000} />
              </AuthProvider>
            </QueryClientWrapper>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
