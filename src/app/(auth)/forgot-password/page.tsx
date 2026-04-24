import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Forgot Password' }

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8 border rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>
        <p className="text-sm text-gray-500">Forgot password form placeholder.</p>
      </div>
    </main>
  )
}
