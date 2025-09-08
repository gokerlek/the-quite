import { RefObject, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const useHeroAnimation = (
  containerRef: RefObject<HTMLElement | null>,
  isClient: boolean,
) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(false)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.set('#quiet-drawing-logo', { opacity: 1 })
      tl.set('#quiet-drawing-logo path', { drawSVG: '50% 50%' })

      tl.to('#quiet-drawing-logo path.core', {
        drawSVG: '0% 100%',
        duration: 2,
        ease: 'sine.inOut',
      })

      tl.to(
        '#quiet-drawing-logo path.ring',
        {
          drawSVG: '0% 100%',
          duration: 2,
          ease: 'sine.inOut',
        },
        '>-0.2',
      )

      tl.to(
        '#quiet-drawing-logo path.frame',
        {
          drawSVG: '0% 100%',
          duration: 2,
          ease: 'sine.inOut',
        },
        '>-0.2',
      )

      tl.call(() => setShowScrollIndicator(true))
    },
    { scope: containerRef, dependencies: [isClient] },
  )

  return { showScrollIndicator }
}
