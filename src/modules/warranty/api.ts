import apiClient from '@/src/lib/axios'
import type { Warranty, WarrantyListResponse, SubmitWarrantyInput } from './types'

export async function getWarranties(ownerId?: string): Promise<WarrantyListResponse> {
  const { data } = await apiClient.get<WarrantyListResponse>('/warranties', {
    params: ownerId ? { ownerId } : undefined,
  })
  return data
}

export async function getWarranty(id: string): Promise<Warranty> {
  const { data } = await apiClient.get<Warranty>(`/warranties/${id}`)
  return data
}

export async function submitWarranty(input: SubmitWarrantyInput): Promise<Warranty> {
  const { data } = await apiClient.post<Warranty>('/warranties', input)
  return data
}

export async function updateWarrantyStatus(
  id: string,
  status: 'approved' | 'rejected',
  rejectionReason?: string
): Promise<Warranty> {
  const { data } = await apiClient.put<Warranty>(`/warranties/${id}/status`, {
    status,
    rejectionReason,
  })
  return data
}
