'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { LoginCredentials } from './types'
import { verifyOtp, requestOtp } from './api'

type UseLoginReturn = {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(credentials: LoginCredentials) {
    setLoading(true)
    setError(null)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      })
      if (result?.error) {
        setError('Invalid email or password.')
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await signOut({ callbackUrl: '/login' })
  }

  return { login, logout, loading, error }
}

export function useAuthSession() {
  return useSession()
}

export function useOtpVerify(phoneNumber: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function verify(code: string): Promise<boolean> {
    setLoading(true)
    setError(null)
    try {
      await verifyOtp(phoneNumber, code)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function resend(): Promise<void> {
    await requestOtp(phoneNumber)
  }

  return { verify, resend, loading, error }
}
