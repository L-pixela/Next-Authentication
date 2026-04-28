export type LoginCredentials = {
  email: string
  password: string
}

export type AuthResponse = {
  accessToken: string
  user: {
    id: string
    name: string
    email: string
  }
}

export type RegisterInput = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type OtpRequest = {
  email: string
}

export type OtpVerifyInput = {
  email: string
  otp: string
}

export type ResetPasswordInput = {
  token: string
  password: string
  confirmPassword: string
}
