import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'OTP Verification' }

export default function OtpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8 border rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Verify OTP</h1>
        <p className="text-sm text-gray-500">OTP verification placeholder.</p>
      </div>
    </main>
  )
}
