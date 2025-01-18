import type { Metadata } from 'next'
import '@/styles/globals.css'
import QueryClientWrapper from './QueryClientProvider'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/context/AuthContext'

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
        <QueryClientWrapper>
          <AuthProvider>
            <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
              {children}
              <ToastContainer autoClose={2000} />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientWrapper>
      </body>
    </html>
  )
}
