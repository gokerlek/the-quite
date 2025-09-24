import { useCallback, useEffect, useState } from 'react'

import { useLoadingContext } from '@/context/LoadingContext'

export const useLoadingState = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false)
  const { setLoaded } = useLoadingContext()

  const endLoading = useCallback(() => {
    setLoading(false)
    setLoaded(true)

    try {
      const timestamp = Date.now()

      localStorage.setItem('loaded', JSON.stringify({ value: true, timestamp }))
    } catch {}
  }, [setLoaded])

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('loaded')

      if (storedData) {
        const parsed = JSON.parse(storedData)
        const hourInMs = 60 * 60 * 1000
        const isExpired = Date.now() - parsed.timestamp > hourInMs

        if (!isExpired && parsed.value === true) {
          setLoadedFromStorage(true)
          setLoading(false) // localStorage'dan gelen değer varsa loading'i de false yap
          setLoaded(true) // Context'i de güncelle
        } else {
          localStorage.removeItem('loaded')
          setLoadedFromStorage(false)
          setLoaded(false) // Context'i de resetle
        }
      } else {
        setLoadedFromStorage(false)
        setLoaded(false) // Context'i de resetle
      }
    } catch {
      setLoadedFromStorage(false)
      setLoaded(false) // Context'i de resetle
    }
  }, [setLoaded])

  const loaded = loadedFromStorage || !loading

  return { loaded, endLoading }
}
