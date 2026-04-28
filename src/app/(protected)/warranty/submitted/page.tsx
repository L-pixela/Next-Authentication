import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Submitted' }

export default function SubmittedPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Submitted</h1>
      <p className="text-sm text-gray-500">Submitted page placeholder.</p>
    </section>
  )
}
