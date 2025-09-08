import { RefObject } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const useScrollAnimation = (
  containerRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  showScrollIndicator: boolean,
) => {
  const createScrollHandler = () => {
    const el = scrollRef.current

    if (!el) return () => {}

    const onScroll = () => {
      const max = Math.max(0, el.scrollHeight - el.clientHeight)
      const y = el.scrollTop || 0
      const p = max > 0 ? Math.min(1, y / max) : 0
      const widthVW = 20 + p * (15000 - 20)

      gsap.set(svgRef.current!, { width: `${widthVW}vw` })

      const startFade = 0.9
      const overlayOpacity = p < startFade ? 1 : Math.max(0, 1 - (p - startFade) / (1 - startFade))

      gsap.set('#overlay', { opacity: overlayOpacity })

      const fadeStartP = 0.05
      const fadeEndP = 0.15
      const t = p <= fadeStartP ? 0 : p >= fadeEndP ? 1 : (p - fadeStartP) / (fadeEndP - fadeStartP)

      gsap.set('#the_quite', { opacity: t })

      const indicatorColor = p >= 0.6 ? '#1c1c1c' : ''

      gsap.set('#scroll_indicator', { color: indicatorColor })

      const u = Math.min(1, Math.max(0, (p - 0.9) / 0.1))
      const bottomInterpolated = u < 1 ? `calc(${(1 - u) * 50}% + ${u * 10}rem)` : '10rem'

      gsap.set('#the_quite', { bottom: bottomInterpolated })

      if (p >= 1) {
        gsap.set(el, { display: 'none' })
        gsap.set('#scroll_indicator', { display: 'none' })
        gsap.set('#overlay', { display: 'none' })
        gsap.set('#the_quiet_description', { display: 'flex' })

        const g = globalThis as unknown as { __finalized__?: boolean }

        if (!g.__finalized__) {
          g.__finalized__ = true
          const tl = gsap.timeline({ delay: 2, defaults: { duration: 3, ease: 'power1.inOut' } })

          tl.to('#the_quiet_description', { opacity: 1 }, 0)
          tl.to('#the_quite', { opacity: 0 }, 0)
          tl.to('#the_quite_white', { opacity: 1 }, 0)
          tl.to('#main', { backgroundColor: '#1c1c1c' }, 0)
        }
      } else {
        gsap.set(el, { display: '' })
        gsap.set('#scroll_indicator', { display: '' })
        gsap.set('#overlay', { display: '' })
        gsap.set('#the_quiet_description', { display: 'none', opacity: 0 })
        const g = globalThis as unknown as { __finalized__?: boolean }

        g.__finalized__ = false
      }
    }

    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })

    return () => el.removeEventListener('scroll', onScroll)
  }

  useGSAP(
    () => {
      if (!showScrollIndicator) return

      if (!svgRef.current) return

      return createScrollHandler()
    },
    { dependencies: [showScrollIndicator], scope: containerRef },
  )
}
