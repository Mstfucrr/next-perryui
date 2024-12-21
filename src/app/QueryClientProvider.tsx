// /app/QueryClientProvider.tsx

'use client'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'react-toastify'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`)
    }
  })
})

const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default QueryClientWrapper
