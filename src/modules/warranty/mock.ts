import type { Warranty } from '@/src/types/warranty'

export const MOCK_WARRANTIES: Warranty[] = [
  {
    id: 'w-001',
    title: 'Air Conditioner Model X',
    serialNumber: 'SN-2024-001',
    activationDate: '2024-01-15',
    status: 'registered',
    coverage: { parts: ['Compressor', 'Fan motor', 'PCB'], periodMonths: 24, laborIncluded: true },
    ownerId: '2',
  },
  {
    id: 'w-002',
    title: 'Washing Machine Pro',
    serialNumber: 'SN-2024-002',
    activationDate: '2024-03-10',
    status: 'rejected',
    rejectionReason: 'Serial number does not match purchase invoice.',
    coverage: { parts: ['Motor', 'Drum'], periodMonths: 12, laborIncluded: false },
    ownerId: '2',
  },
  {
    id: 'w-003',
    title: 'Smart TV 55"',
    serialNumber: 'SN-2024-003',
    activationDate: '2024-06-01',
    status: 'submitted',
    coverage: { parts: ['Panel', 'Mainboard'], periodMonths: 12, laborIncluded: true },
    ownerId: '2',
  },
]

function delay(ms = 400): Promise<void> {
  return new Promise((res) => setTimeout(res, ms))
}

export const mockWarrantyAdapter = {
  async list(ownerId: string): Promise<Warranty[]> {
    await delay()
    return MOCK_WARRANTIES.filter((w) => w.ownerId === ownerId)
  },

  async getById(id: string): Promise<Warranty | null> {
    await delay()
    return MOCK_WARRANTIES.find((w) => w.id === id) ?? null
  },

  async submit(payload: Partial<Warranty>): Promise<Warranty> {
    await delay()
    const newWarranty: Warranty = {
      id: `w-${Date.now()}`,
      title: payload.title ?? '',
      serialNumber: payload.serialNumber ?? '',
      activationDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      coverage: payload.coverage ?? { parts: [], periodMonths: 12, laborIncluded: false },
      ownerId: payload.ownerId ?? '',
    }
    MOCK_WARRANTIES.push(newWarranty)
    return newWarranty
  },
}
