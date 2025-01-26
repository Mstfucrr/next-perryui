// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { privateAxiosInstance, publicAxiosInstance } from '@/lib/axios'

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
    console.log('input', input)
    // return publicAxiosInstance.post<ILoginResponse>(`${this.baseUrl}/login`, input)
    publicAxiosInstance.post<ILoginResponse>(`${this.baseUrl}/login`, input)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errResponse = {
        message: 'Kullanıcı bulunamadı.'
      }
      const mockResponse = {
        data: {
          id: 'mockId',
          email: 'mockEmail',
          roleId: 'mockRoleId',
          name: 'mockName',
          permissions: ['admin']
        }
      }
      return Promise.resolve(mockResponse)
      // return Promise.reject(errResponse)
    } catch (error) {
      console.log('errorsssss', error)
      return Promise.reject(new Error('Kullanıcı bulunamadı.'))
    }
  }

  async getUsers() {
    return privateAxiosInstance.get('/users')
  }

  async updateUserPermissions(permissions: { [key: string]: string[] }) {
    return privateAxiosInstance.post('/update-permissions', permissions)
  }
}

export const authService = new AuthService()
