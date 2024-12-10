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
    // return publicAxiosInstance.post<ILoginResponse>(`${this.baseUrl}/login`, input)
    console.log('login', input)
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

    const mockResponse = {
      data: {
        id: 'mockId',
        email: 'mockEmail',
        roleId: 'mockRoleId',
        name: 'mockName'
      }
    }
    return Promise.resolve(mockResponse)
  }
}

export const authService = new AuthService()
