import { RefObject, useRef } from 'react'
//iki
import { RefObject, useRef } from 'react'
// 3
import { RefObject, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const useScrollAnimation = (
  containerRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  showScrollIndicator: boolean,
) => {
  const firstScrollTriggered = useRef(false)
  const autoScrollActive = useRef(false)
  const maxSvgWidth = useRef(0)

  const createScrollHandler = () => {
    const el = scrollRef.current

    if (!el) return () => {}

    const onScroll = () => {
      const max = Math.max(0, el.scrollHeight - el.clientHeight)
      const y = el.scrollTop || 0
      const p = max > 0 ? Math.min(1, y / max) : 0

      if (!firstScrollTriggered.current && y > 0 && showScrollIndicator) {
        firstScrollTriggered.current = true
        autoScrollActive.current = true

        gsap.to(el, {
          scrollTop: max * 0.75,
          duration: 6,
          ease: 'power2.inOut',
          onUpdate: () => {
            const currentY = el.scrollTop || 0
            const currentP = max > 0 ? Math.min(1, currentY / max) : 0
            const currentWidthVW = 20 + currentP * (15000 - 20)

            gsap.set(svgRef.current!, { width: `${currentWidthVW}vw` })
          },
          onComplete: () => {
            const finalY = el.scrollTop || 0
            const finalP = max > 0 ? Math.min(1, finalY / max) : 0

            maxSvgWidth.current = 20 + finalP * (15000 - 20)
            autoScrollActive.current = false
          },
        })
      }

      const widthVW = 20 + p * (15000 - 20)

      gsap.set(svgRef.current!, { width: `${widthVW}vw` })

      const startFade = 0.9
      const overlayOpacity = p < startFade ? 1 : Math.max(0, 1 - (p - startFade) / (1 - startFade))

      gsap.set('#overlay', { opacity: overlayOpacity })

      const fadeStartP = 0.05
      const fadeEndP = 0.15
      const t = p <= fadeStartP ? 0 : p >= fadeEndP ? 1 : (p - fadeStartP) / (fadeEndP - fadeStartP)

      gsap.set('#the_quite', { opacity: t })

      const indicatorColor = p >= 0.75 ? '#1c1c1c' : ''

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

export const useScrollAnimation = (
  containerRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  showScrollIndicator: boolean,
) => {
  const timeline1Triggered = useRef(false)
  const timeline2Triggered = useRef(false)
  const timeline3Triggered = useRef(false)
  const timeline4Triggered = useRef(false)
  const timeline1 = useRef<gsap.core.Timeline | null>(null)
  const timeline2 = useRef<gsap.core.Timeline | null>(null)
  const timeline3 = useRef<gsap.core.Timeline | null>(null)
  const timeline4 = useRef<gsap.core.Timeline | null>(null)
  const createEventHandler = () => {
    const el = scrollRef.current

    if (!el) return () => {}

    // Scroll indicator kontrolü
    const showScrollIndicatorFunc = () => {
      const scrollIndicatorElement = document.getElementById('scroll_indicator')

      if (scrollIndicatorElement) {
        gsap.set(scrollIndicatorElement, { display: 'block' })
      }
    }

    const hideScrollIndicatorFunc = () => {
      const scrollIndicatorElement = document.getElementById('scroll_indicator')

      if (scrollIndicatorElement) {
        gsap.set(scrollIndicatorElement, { display: 'none' })
      }
    }

    // Timeline tetikleme fonksiyonu
    const triggerTimelines = () => {
      // 1. Timeline - İlk scroll
      if (!timeline1Triggered.current && showScrollIndicator) {
        timeline1Triggered.current = true
        hideScrollIndicatorFunc()
        timeline1.current?.play()

        // Timeline 1 bitince scroll indicator göster
        timeline1.current?.eventCallback('onComplete', () => {
          showScrollIndicatorFunc()
        })

        return
      }

      // 2. Timeline - 1. bittikten sonra scroll
      if (timeline1Triggered.current && !timeline2Triggered.current) {
        const tl1 = timeline1.current

        if (tl1 && tl1.progress() >= 1) {
          timeline2Triggered.current = true
          hideScrollIndicatorFunc()
          timeline2.current?.play()

          // Timeline 2 bitince scroll indicator göster
          timeline2.current?.eventCallback('onComplete', () => {
            const scrollIndicatorElement = document.getElementById('scroll_indicator')

            if (scrollIndicatorElement) {
              gsap.set(scrollIndicatorElement, { display: 'block', color: '#1c1c1c' })
            }
          })
        }

        return
      }

      // 3. Timeline - 2. bittikten sonra scroll
      if (timeline2Triggered.current && !timeline3Triggered.current) {
        const tl2 = timeline2.current

        if (tl2 && tl2.progress() >= 1) {
          timeline3Triggered.current = true
          hideScrollIndicatorFunc()
          timeline3.current?.play()

          // Timeline 3 bitince scroll indicator göster
          timeline3.current?.eventCallback('onComplete', () => {
            const scrollIndicatorElement = document.getElementById('scroll_indicator')

            if (scrollIndicatorElement) {
              gsap.set(scrollIndicatorElement, { display: 'block', color: '#1c1c1c' })
            }
          })
        }

        return
      }

      // 4. Timeline - 3. bittikten sonra scroll
      if (timeline3Triggered.current && !timeline4Triggered.current) {
        const tl3 = timeline3.current

        if (tl3 && tl3.progress() >= 1) {
          timeline4Triggered.current = true
          hideScrollIndicatorFunc()
          timeline4.current?.play()
        }
      }
    }

    // Wheel event ile tetikleme (desktop)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      triggerTimelines()
    }

    // Touch event ile tetikleme (mobile)
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      triggerTimelines()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
    }
  }

  useGSAP(
    () => {
      if (!showScrollIndicator) return

      if (!svgRef.current) return

      // Ana timeline oluştur (1-4 numaralı animasyonlar)
      const tl = gsap.timeline({ paused: true })

      // Başlangıç durumlarını ayarla
      tl.set(svgRef.current, { width: '20vw' })

      // Element kontrolü ve doğrudan element referansı kullan
      const theQuiteElement = document.getElementById('the_quite')
      const scrollIndicatorElement = document.getElementById('scroll_indicator')
      const overlayElement = document.getElementById('overlay')
      const theQuietDescriptionElement = document.getElementById('the_quiet_description')
      const theQuiteWhiteElement = document.getElementById('the_quite_white')
      const mainElement = document.getElementById('main')

      if (theQuiteElement) {
        tl.set(theQuiteElement, { opacity: 0 })
      }

      // 1. SVG Büyüme Animasyonu (20vw → 15000vw)
      tl.to(svgRef.current, {
        width: '15000vw',
        duration: 8,
        ease: 'power2.inOut',
      })

      // 2. "The Quite" Fade In (%5-15 arası)
      if (theQuiteElement) {
        tl.to(
          theQuiteElement,
          {
            opacity: 1,
            duration: 3,
            ease: 'power1.inOut',
          },
          '-=6',
        )
      }

      timeline1.current = tl

      // Timeline 2: Overlay Fade Out
      const tl2 = gsap.timeline({ paused: true })

      if (overlayElement) {
        tl2.to(overlayElement, {
          opacity: 0,
          duration: 2,
          ease: 'power1.inOut',
        })
      }

      // Scroll indicator'ın rengini değiştir (overlay artık yok)
      if (scrollIndicatorElement) {
        tl2.set(scrollIndicatorElement, { color: '#1c1c1c' }, '-=0.1')
      }

      timeline2.current = tl2

      // Timeline 3: "The Quite" Aşağı Hareketi
      const tl3 = gsap.timeline({ paused: true })

      if (theQuiteElement) {
        tl3.to(theQuiteElement, {
          bottom: '10rem',
          duration: 2,
          ease: 'power2.inOut',
        })
      }

      timeline3.current = tl3

      // Timeline 4: Final Timeline
      const tl4 = gsap.timeline({ paused: true })

      if (scrollRef.current) {
        tl4.set(scrollRef.current, { display: 'none' })
      }

      if (scrollIndicatorElement) {
        tl4.set(scrollIndicatorElement, { display: 'none' })
      }

      if (overlayElement) {
        tl4.set(overlayElement, { display: 'none' })
      }

      if (theQuietDescriptionElement) {
        tl4.set(theQuietDescriptionElement, { display: 'flex' })
      }

      if (theQuietDescriptionElement) {
        tl4.to(theQuietDescriptionElement, { opacity: 1, duration: 3, ease: 'power1.inOut' }, '+=2')
      }

      if (theQuiteElement) {
        tl4.to(theQuiteElement, { opacity: 0, duration: 1, ease: 'power1.inOut' }, '-=3')
      }

      if (theQuiteWhiteElement) {
        tl4.to(theQuiteWhiteElement, { opacity: 1, duration: 3, ease: 'power1.inOut' }, '-=3')
      }

      if (mainElement) {
        tl4.to(
          mainElement,
          { backgroundColor: '#1c1c1c', duration: 3, ease: 'power1.inOut' },
          '-=3',
        )
      }

      timeline4.current = tl4

      return createEventHandler()
    },
    { dependencies: [showScrollIndicator], scope: containerRef },
  )
}

export const useScrollAnimation = (
  homeRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  showScrollIndicator: boolean,
) => {
  const timeline1Triggered = useRef(false)
  const timeline2Triggered = useRef(false)
  const timeline3Triggered = useRef(false)
  const timeline4Triggered = useRef(false)
  const timeline1 = useRef<gsap.core.Timeline | null>(null)
  const timeline2 = useRef<gsap.core.Timeline | null>(null)
  const timeline3 = useRef<gsap.core.Timeline | null>(null)
  const timeline4 = useRef<gsap.core.Timeline | null>(null)
  const createEventHandler = () => {
    const el = scrollRef.current

    if (!el) return () => {}

    // Scroll indicator kontrolü
    const showScrollIndicatorFunc = () => {
      gsap.set('#scroll_indicator', { display: 'block' })
    }

    const hideScrollIndicatorFunc = () => {
      gsap.set('#scroll_indicator', { display: 'none' })
    }

    // Timeline tetikleme fonksiyonu
    const triggerTimelines = () => {
      // 1. Timeline - İlk scroll
      if (!timeline1Triggered.current && showScrollIndicator) {
        timeline1Triggered.current = true
        hideScrollIndicatorFunc()
        timeline1.current?.play()

        // Timeline 1 bitince scroll indicator göster
        timeline1.current?.eventCallback('onComplete', () => {
          showScrollIndicatorFunc()
        })

        return
      }

      // 2. Timeline - 1. bittikten sonra scroll
      if (timeline1Triggered.current && !timeline2Triggered.current) {
        const tl1 = timeline1.current

        if (tl1 && tl1.progress() >= 1) {
          timeline2Triggered.current = true
          hideScrollIndicatorFunc()
          timeline2.current?.play()

          // Timeline 2 bitince scroll indicator göster
          timeline2.current?.eventCallback('onComplete', () => {
            gsap.set('#scroll_indicator', { display: 'block', color: '#1c1c1c' })
          })
        }

        return
      }

      // 3. Timeline - 2. bittikten sonra scroll
      if (timeline2Triggered.current && !timeline3Triggered.current) {
        const tl2 = timeline2.current

        if (tl2 && tl2.progress() >= 1) {
          timeline3Triggered.current = true
          hideScrollIndicatorFunc()
          timeline3.current?.play()

          // Timeline 3 bitince scroll indicator göster
          timeline3.current?.eventCallback('onComplete', () => {
            gsap.set('#scroll_indicator', { display: 'block', color: '#1c1c1c' })
          })
        }

        return
      }

      // 4. Timeline - 3. bittikten sonra scroll
      if (timeline3Triggered.current && !timeline4Triggered.current) {
        const tl3 = timeline3.current

        if (tl3 && tl3.progress() >= 1) {
          timeline4Triggered.current = true
          hideScrollIndicatorFunc()
          timeline4.current?.play()
        }
      }
    }

    // Wheel event ile tetikleme (desktop)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      triggerTimelines()
    }

    // Touch event ile tetikleme (mobile)
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      triggerTimelines()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
    }
  }

  useGSAP(
    () => {
      if (!showScrollIndicator) return

      if (!svgRef.current) return

      // Ana timeline oluştur (1-4 numaralı animasyonlar)
      const tl = gsap.timeline({ paused: true })

      // Başlangıç durumlarını ayarla
      tl.set(svgRef.current, { width: '20vw' })

      // GSAP scope içinde elementlere direkt erişim

      tl.set('#the_quite', { opacity: 0 })

      // 1. SVG Büyüme Animasyonu (20vw → 15000vw)
      tl.to(svgRef.current, {
        width: '15000vw',
        duration: 8,
        ease: 'power2.inOut',
      })

      // 2. "The Quite" Fade In (%5-15 arası)
      tl.to(
        '#the_quite',
        {
          opacity: 1,
          duration: 3,
          ease: 'power1.inOut',
        },
        '-=6',
      )

      timeline1.current = tl

      // Timeline 2: Overlay Fade Out
      const tl2 = gsap.timeline({ paused: true })

      tl2.to('#overlay', {
        opacity: 0,
        duration: 2,
        ease: 'power1.inOut',
      })

      // Scroll indicator'ın rengini değiştir (overlay artık yok)
      tl2.set('#scroll_indicator', { color: '#1c1c1c' }, '-=1')

      timeline2.current = tl2

      // Timeline 3: "The Quite" Aşağı Hareketi
      const tl3 = gsap.timeline({ paused: true })

      tl3.to('#the_quite', {
        bottom: '10rem',
        duration: 2,
        ease: 'power2.inOut',
      })

      timeline3.current = tl3

      // Timeline 4: Final Timeline
      const tl4 = gsap.timeline({ paused: true })

      tl4.set(scrollRef.current, { display: 'none' })
      tl4.set('#scroll_indicator', { display: 'none' })
      tl4.set('#overlay', { display: 'none' })
      tl4.set('#the_quiet_description', { display: 'flex' })
      tl4.to('#the_quiet_description', { opacity: 1, duration: 3, ease: 'power1.inOut' }, '+=2')
      tl4.to('#the_quite', { opacity: 0, duration: 1, ease: 'power1.inOut' }, '-=3')
      tl4.to('#the_quite_white', { opacity: 1, duration: 3, ease: 'power1.inOut' }, '-=3')
      tl4.to('#main', { backgroundColor: '#1c1c1c', duration: 3, ease: 'power1.inOut' }, '-=3')

      timeline4.current = tl4

      return createEventHandler()
    },
    { dependencies: [showScrollIndicator], scope: homeRef },
  )
}
