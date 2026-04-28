import type { Metadata } from 'next'
import Dashboard from '@/src/components/warranty/Dashboard'

export const metadata: Metadata = { title: 'Warranties' }

export default function WarrantyListPage() {
  return (
    <Dashboard />
  )
}
