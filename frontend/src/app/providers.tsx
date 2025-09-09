'use client'

import { ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Sonner } from '@/components/sonner'
import { LoadingProvider, useLoadingContext } from '@/context/LoadingContext'

function LoadingScreen() {
  // minimal loading indicator centered on screen
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='h-6 w-6 animate-spin rounded-full border-2 border-offblack-400 border-t-transparent' />
    </div>
  )
}

function InnerProviders({ children }: { children: ReactNode }) {
  const { isClient } = useLoadingContext()

  if (!isClient) {
    return <LoadingScreen />
  }

  return (
    <>
      {children}

      <Sonner />

      {/* Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

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
      <LoadingProvider>
        <InnerProviders>{children}</InnerProviders>
      </LoadingProvider>
    </QueryClientProvider>
  )
}
