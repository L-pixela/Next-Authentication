import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Registered' }

export default function RegisteredPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Registered</h1>
      <p className="text-sm text-gray-500">Registered page placeholder.</p>
    </section>
  )
}
