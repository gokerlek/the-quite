'use client'

import { ReactNode, useState } from 'react'
import { ThemeProvider } from 'next-themes'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Sonner } from '@/components/sonner'

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000, // keep cached data for 5 minutes
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} storageKey='theme'>
        {children}

        <Sonner />
      </ThemeProvider>

      {/* Devtools out of ThemeProvider to avoid affecting its UI theme */}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
