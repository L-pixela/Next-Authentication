import type { Role } from '@/src/types/auth'

export type UserProfile = {
  id: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
  createdAt: string
}

export type UpdateProfileInput = {
  name?: string
  avatarUrl?: string
}
