import { HTTPMethod } from 'http-method-enum'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Genel istek fonksiyonu
const makeRequest = async <T>(method: HTTPMethod, url: string, data?: unknown): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Bir hata oluştu')
  }

  return response.json()
}

makeRequest.get = <T>(url: string): Promise<T> => makeRequest<T>(HTTPMethod.GET, url)
makeRequest.post = <T>(url: string, data?: unknown): Promise<T> => makeRequest<T>(HTTPMethod.POST, url, data)
makeRequest.put = <T>(url: string, data?: unknown): Promise<T> => makeRequest<T>(HTTPMethod.PUT, url, data)
makeRequest.delete = <T>(url: string): Promise<T> => makeRequest<T>(HTTPMethod.DELETE, url)

export default makeRequest
