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
      const v = window.localStorage.getItem('loaded')

      setLoadedState(v === 'true')
    } catch {
      setLoadedState(false)
    }
  }, [])

  const setLoaded = useCallback((value: boolean) => {
    setLoadedState(value)

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('loaded', value ? 'true' : 'false')
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
