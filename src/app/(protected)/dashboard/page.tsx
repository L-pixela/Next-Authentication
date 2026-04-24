import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="text-sm text-gray-500">Welcome to the warranty management dashboard.</p>
    </section>
  )
}
