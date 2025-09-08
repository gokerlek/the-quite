import { useCallback, useEffect, useState } from 'react'

export const useLoadingState = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false)

  const endLoading = useCallback(() => {
    setLoading(false)

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('loaded', 'true')
      } catch {}
    }
  }, [])

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
