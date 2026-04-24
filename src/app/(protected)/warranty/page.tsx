import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Warranties' }

export default function WarrantyListPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Warranties</h1>
      <p className="text-sm text-gray-500">Warranty list placeholder.</p>
    </section>
  )
}
