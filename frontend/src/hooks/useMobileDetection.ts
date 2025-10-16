import { useEffect, useState } from 'react'

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const detectMobile = () => {
      if (typeof window === 'undefined') return false

      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 768
      )
    }

    setIsMobile(detectMobile())

    const handleResize = () => {
      setIsMobile(detectMobile())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
