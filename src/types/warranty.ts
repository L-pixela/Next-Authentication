export type WarrantyStatus = 'registered' | 'submitted' | 'rejected' | 'approved'

export type WarrantyCoverage = {
  parts: string[]
  periodMonths: number
  laborIncluded: boolean
}

export type Warranty = {
  id: string
  title: string
  serialNumber: string
  activationDate: string
  status: WarrantyStatus
  rejectionReason?: string
  coverage: WarrantyCoverage
  ownerId: string
}

export type WarrantyListResponse = {
  data: Warranty[]
  total: number
}

export type SubmitWarrantyInput = {
  title: string
  serialNumber: string
  coverage: WarrantyCoverage
  ownerId: string
}
