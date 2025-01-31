import { z } from 'zod'
import { loginSchema } from '../services/schema'

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

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
  name: string
  role: Role
}

export type LoginFormInputs = z.infer<typeof loginSchema>
