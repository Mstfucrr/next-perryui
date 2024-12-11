import { privateAxiosInstance, publicAxiosInstance } from '@/lib/axios'
import { ICurrentUserInfo } from '@/types'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
}

class AuthService {
  private readonly baseUrl = '/auth'

  async login(input: ILoginRequest) {
    // Simulate a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    // return publicAxiosInstance.post<ILoginResponse>(`${this.baseUrl}/login`, input)
    const errResponse = {
      data: {
        message: 'Invalid email or password'
      }
    }
    const mockResponse = {
      token: 'mockToken'
    }
    return Promise.resolve(mockResponse)
  }

  async logout() {
    return privateAxiosInstance.post<ILoginResponse>(`${this.baseUrl}/logout`)
  }

  async refreshToken() {
    return privateAxiosInstance.post<ILoginResponse>(`${this.baseUrl}/refresh-token`)
  }

  async getUser() {
    // return privateAxiosInstance.get<ICurrentUserInfo>(`${this.baseUrl}/user`)

    try {
      const errResponse = {
        message: 'Kullanıcı bulunamadı.'
      }
      const mockResponse = {
        data: {
          id: 'mockId',
          email: 'mockEmail',
          roleId: 'mockRoleId',
          name: 'mockName'
        }
      }
      return Promise.resolve(mockResponse)
    } catch (error) {
      console.log('errorsssss', error)
      return Promise.reject(error)
    }
  }
}

export const authService = new AuthService()
