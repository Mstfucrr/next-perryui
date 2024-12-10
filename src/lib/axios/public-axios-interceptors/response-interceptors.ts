import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export const addErrorHandlingResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error:', error)
      }

      return Promise.reject(error)
    }
  )
}
