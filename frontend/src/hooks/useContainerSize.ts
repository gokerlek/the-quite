import { useEffect, useState } from 'react'

import { useMobileDetection } from '@/hooks/useMobileDetection'

export const useContainerSize = () => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const isMobile = useMobileDetection()

  // Container boyutunu dinamik hesapla
  useEffect(() => {
    const calculateSize = () => {
      const { innerWidth: screenWidth, innerHeight: screenHeight } = window
      const svgRatio = isMobile ? 375 / 852 : 1440 / 1024
      const screenRatio = screenWidth / screenHeight

      if (screenRatio > svgRatio) {
        // Geniş ekran: yüksekliğe göre boyutlandır
        const height = screenHeight
        const width = height * svgRatio

        setContainerSize({ width, height })
      } else {
        // Uzun ekran: genişliğe göre boyutlandır
        const width = screenWidth
        const height = width / svgRatio

        setContainerSize({ width, height })
      }
    }

    calculateSize()
    window.addEventListener('resize', calculateSize)

    return () => window.removeEventListener('resize', calculateSize)
  }, [isMobile])

  return { containerSize }
}
