import { z } from 'zod'
import { loginSchema } from '../services/schema'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
}

export interface ICurrentUserInfo {
  id: string
  email: string
  roleId: string
  name: string
  permissions: string[]
}

export type LoginFormInputs = z.infer<typeof loginSchema>
