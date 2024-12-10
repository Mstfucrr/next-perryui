import axios from 'axios'
import { addErrorHandlingResponseInterceptor, refreshTokenResponseInterceptor } from './private-axios-interceptors'

// import axiosRateLimit, { RateLimitedAxiosInstance } from '../axios-rate-limiting'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + '/'

export const privateAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})

addErrorHandlingResponseInterceptor(privateAxiosInstance)

refreshTokenResponseInterceptor(privateAxiosInstance)

// axiosRateLimit(privateAxiosInstance as RateLimitedAxiosInstance, {
//   maxRPS: 1
// })
