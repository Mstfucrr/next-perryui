import axios from 'axios'
import { addErrorHandlingResponseInterceptor } from './public-axios-interceptors/response-interceptors'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + '/'

export const publicAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

addErrorHandlingResponseInterceptor(publicAxiosInstance)
