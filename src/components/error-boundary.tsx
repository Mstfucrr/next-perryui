'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='flex min-h-screen items-center justify-center bg-background dark:bg-background-dark'>
          <Card className='w-full max-w-md'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-red-600 dark:text-red-400'>
                <AlertTriangle className='h-6 w-6' />
                Oops! Bir şeyler yanlış gitti.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant='destructive' className='mb-4'>
                <AlertTitle>Hata</AlertTitle>
                <AlertDescription>
                  Uygulamamızda beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.
                </AlertDescription>
              </Alert>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant='outline' className='w-full'>
                    Hata Detayları
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-2'>
                  <pre className='overflow-auto rounded-md bg-card p-4 text-sm dark:bg-card-dark'>
                    {this.state.error?.toString()}
                  </pre>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter>
              <Button className='w-full' onClick={() => window.location.reload()}>
                <RefreshCw className='mr-2 h-4 w-4' /> Sayfayı Yenile
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
