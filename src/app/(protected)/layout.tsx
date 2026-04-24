import { redirect } from 'next/navigation'
import { getServerAuthSession } from '@/src/lib/auth'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/login')
  }

  return <div className="protected-layout">{children}</div>
}
