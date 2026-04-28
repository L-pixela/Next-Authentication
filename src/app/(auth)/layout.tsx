import AppFooter from '@/src/components/ui/layout/AppFooter'
import AppHeader from '@/src/components/ui/layout/AppHeader'
import { getServerAuthSession } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { Container, Content } from 'rsuite'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerAuthSession()
    
    if (session) redirect('/warranty')

  return (
    <Container style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content>
        {children}
      </Content>
      <AppFooter />
    </Container>
  )
}