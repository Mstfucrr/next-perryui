import { authService } from '@/modules/auth/services/api/auth'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import createAuthRefreshInterceptor, { AxiosAuthRefreshOptions } from 'axios-auth-refresh'

const isNetworkError = (error: AxiosError) => {
  return error.message === 'Network Error' || error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'
}

const REFRESH_TOKEN_URL = '/auth/refresh-token'

const isAuthError = (error: AxiosError) => {
  return (
    error.response &&
    ((error.response.status === 401 && error.response.config.url === REFRESH_TOKEN_URL) ||
      // If the response status is 403 and url is /key, it means that the refresh token is expired
      (error.response.status === 403 && error.response.config.url === REFRESH_TOKEN_URL))
  )
}

const isTooManyRequestsError = (error: AxiosError) => {
  return error.response?.status === 429
}

const forbiddenErrorCountsPerURL: Record<string, number> = {}

export const addErrorHandlingResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (config: AxiosResponse) => {
      const url = config.config.url as string
      forbiddenErrorCountsPerURL[url] = 0 // reset the count

      return config
    },
    (error: AxiosError) => {
      // If the error is Network Error then Server is down
      if (isNetworkError(error)) {
        throw new Error('Server is down')
      }
      // If the response status is 401 or 403 and url is /key, it means that the refresh token is expired
      else if (isAuthError(error)) {
        localStorage.removeItem('user')
        throw new Error('Authentication error')
      } else if (error.response?.status === 403) {
        const url = error.response.config.url as string

        forbiddenErrorCountsPerURL[url] = (forbiddenErrorCountsPerURL[url] || 0) + 1

        if (forbiddenErrorCountsPerURL[url] > 2) {
          throw new Error('Forbidden')
        }
      }

      // If error is too many requests
      else if (isTooManyRequestsError(error)) {
        throw new Error('Too many requests')
      }

      return Promise.reject(error)
    }
  )
}

export const refreshTokenResponseInterceptor = (axiosInstance: AxiosInstance) => {
  // If a request returns 401 error, this method will run and it will try to refresh the token
  // Then it will try to make the request again
  const refreshAuthLogic = (): Promise<void> => {
    // If refreshToken cookie is not present, redirect to login
    if (!document.cookie) {
      return Promise.resolve()
    }
    const refreshToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('refreshToken='))
      ?.split('=')[1]

    if (!refreshToken) {
      return Promise.resolve()
    }

    return authService
      .refreshToken()
      .then(() => {
        return Promise.resolve()
      })
      .catch(() => {
        localStorage.removeItem('user')
        throw new Error('Authentication error')
      })
  }

  const refreshInterceptorOptions: AxiosAuthRefreshOptions = {
    statusCodes: [401, 403]
  }

  // Axios interceptor that adds token to the request
  // Instantiate the interceptor
  createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, refreshInterceptorOptions)
}
