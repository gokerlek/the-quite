import { useCallback, useEffect, useState } from 'react'

import { useLoadingContext } from '@/context/LoadingContext'

export const useLoadingState = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false)
  const { setLoaded } = useLoadingContext()

  const endLoading = useCallback(() => {
    setLoading(false)
    setLoaded(true)

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('loaded', 'true')
      } catch {}
    }
  }, [setLoaded])

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      setLoadedFromStorage(window.localStorage.getItem('loaded') === 'true')
    } catch {
      setLoadedFromStorage(false)
    }
  }, [])

  const loaded = loadedFromStorage || !loading

  return { loaded, endLoading }
}
