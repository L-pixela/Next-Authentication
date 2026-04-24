import apiClient from '@/src/lib/axios'
import type { UserProfile, UpdateProfileInput } from './types'

export async function getUserProfile(): Promise<UserProfile> {
  const { data } = await apiClient.get<UserProfile>('/users/me')
  return data
}

export async function updateProfile(input: UpdateProfileInput): Promise<UserProfile> {
  const { data } = await apiClient.put<UserProfile>('/users/me', input)
  return data
}
