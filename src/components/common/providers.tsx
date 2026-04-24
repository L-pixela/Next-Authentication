'use client'

import { SessionProvider } from 'next-auth/react'
import { CustomProvider } from 'rsuite'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomProvider theme="light">
        {children}
      </CustomProvider>
    </SessionProvider>
  )
}