'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type LoadingContextValue = {
  loaded: boolean
  setLoaded: (value: boolean) => void
  isClient: boolean
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoadedState] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)

  // set isClient and initialize from localStorage on mount
  useEffect(() => {
    setIsClient(true)

    if (typeof window === 'undefined') return

    try {
      const storedData = localStorage.getItem('loaded')

      if (storedData) {
        // Hook formatını kontrol et
        try {
          const parsed = JSON.parse(storedData)
          const hourInMs = 60 * 60 * 1000
          const isExpired = Date.now() - parsed.timestamp > hourInMs

          if (!isExpired && parsed.value === true) {
            setLoadedState(true)
          } else {
            setLoadedState(false)
            localStorage.removeItem('loaded')
          }
        } catch {
          // Eski string formatı
          setLoadedState(storedData === 'true')
        }
      } else {
        setLoadedState(false)
      }
    } catch {
      setLoadedState(false)
    }
  }, [])

  const setLoaded = useCallback((value: boolean) => {
    setLoadedState(value)

    if (typeof window !== 'undefined') {
      try {
        // Hook ile aynı formatı kullan
        const timestamp = Date.now()

        localStorage.setItem('loaded', JSON.stringify({ value, timestamp }))
      } catch {}
    }
  }, [])

  const value = useMemo(() => ({ loaded, setLoaded, isClient }), [loaded, setLoaded, isClient])

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}

export function useLoadingContext(): LoadingContextValue {
  const ctx = useContext(LoadingContext)

  if (!ctx) throw new Error('useLoadingContext must be used within LoadingProvider')

  return ctx
}
