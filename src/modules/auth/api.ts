import apiClient from '@/src/lib/axios'
import type {
  LoginCredentials,
  AuthResponse,
  RegisterInput,
  OtpVerifyInput,
  ResetPasswordInput,
} from './types'

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)
  return data
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', input)
  return data
}

export async function requestOtp(email: string): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/auth/otp/request', { email })
  return data
}

export async function verifyOtp(email: string, otp: string): Promise<{ verified: boolean }> {
  const { data } = await apiClient.post<{ verified: boolean }>('/auth/otp/verify', {
    email,
    otp,
  } satisfies OtpVerifyInput)
  return data
}

export async function resetPassword(input: ResetPasswordInput): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/auth/reset-password', input)
  return data
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/auth/forgot-password', { email })
  return data
}
