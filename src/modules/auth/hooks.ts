'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { LoginCredentials } from './types'

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
