'use client'

import { ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Sonner } from '@/components/sonner'

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      {children}

      <Sonner />
    </QueryClientProvider>
  )
}
