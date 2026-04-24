import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <p className="text-sm text-gray-500">Profile page placeholder.</p>
    </section>
  )
}
