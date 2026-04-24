'use client'

import { useState, useEffect, useCallback } from 'react'
import { getWarranties, getWarranty } from './api'
import type { Warranty } from './types'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useWarranties(ownerId?: string) {
  const [state, setState] = useState<FetchState<Warranty[]>>({
    data: null,
    loading: true,
    error: null,
  })

  const refetch = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const response = await getWarranties(ownerId)
      setState({ data: response.data, loading: false, error: null })
    } catch {
      setState({ data: null, loading: false, error: 'Failed to load warranties.' })
    }
  }, [ownerId])

  useEffect(() => { void refetch() }, [refetch])

  return { ...state, refetch }
}

export function useWarranty(id: string) {
  const [state, setState] = useState<FetchState<Warranty>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState({ data: null, loading: true, error: null })
    getWarranty(id)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, loading: false, error: 'Failed to load warranty.' })
      })
    return () => { cancelled = true }
  }, [id])

  return state
}
