import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, expect, test, beforeEach, Mock } from 'vitest'
import axios from 'axios'
import HubPage from '@/modules/hub/views/hub'

// Mock axios
vi.mock('axios')

const mockedAxios = axios as unknown as {
  get: Mock
}

// React Query Client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity
      }
    }
  })

beforeEach(() => {
  vi.clearAllMocks() // Mock'ları temizle
})

describe('HubPage', () => {
  test('renders data after fetching', async () => {
    const queryClient = createTestQueryClient()

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false
      }
    })

    render(
      <QueryClientProvider client={queryClient}>
        <HubPage id='1' />
      </QueryClientProvider>
    )

    // `Loaded` metninin yalnızca bir kez bulunmasını kontrol et
    await waitFor(() => {
      const loadedElements = screen.getAllByText('Loaded')
      expect(loadedElements.length).toBe(1)
    })

    // JSON içeriğini kontrol et
    const jsonContent = screen.getByText(content => {
      try {
        JSON.parse(content)
        return true
      } catch (error) {
        return false
      }
    })
    console.log('jsonContent', jsonContent.textContent)
    expect(jsonContent).toBeTruthy()
  })
})
