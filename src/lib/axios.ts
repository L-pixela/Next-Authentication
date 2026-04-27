import axios from 'axios'
import { getSession } from 'next-auth/react'

const apiClient = axios.create({
  baseURL: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const { signOut } = await import('next-auth/react')
        await signOut({ callbackUrl: '/login' })
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
