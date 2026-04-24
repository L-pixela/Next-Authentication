import type { Metadata } from 'next'
import { Providers } from '@/src/components/common/providers'
import 'rsuite/dist/rsuite.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'WarrantyApp', template: '%s | WarrantyApp' },
  description: 'Product warranty management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}