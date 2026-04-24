'use client'

import { useState, useEffect } from 'react'
import { getUserProfile, updateProfile } from './api'
import type { UserProfile, UpdateProfileInput } from './types'

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getUserProfile()
      .then((data) => { setProfile(data); setLoading(false) })
      .catch(() => { setError('Failed to load profile.'); setLoading(false) })
  }, [])

  async function update(input: UpdateProfileInput) {
    const updated = await updateProfile(input)
    setProfile(updated)
    return updated
  }

  return { profile, loading, error, update }
}
