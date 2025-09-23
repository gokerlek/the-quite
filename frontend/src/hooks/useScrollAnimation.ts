import { RefObject, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const useScrollAnimation = (
  homeRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  showScrollIndicator: boolean,
) => {
  // Timeline durum yönetimi
  const timelineStates = useRef({
    timeline1Triggered: false, // SVG Büyüme + Yazı + Overlay
    timeline2Triggered: false, // Yazı Hareket
    timeline3Triggered: false, // Final Sahne
  })

  // Timeline referansları
  const timelines = useRef({
    timeline1: null as gsap.core.Timeline | null, // SVG Büyüme + Yazı + Overlay
    timeline2: null as gsap.core.Timeline | null, // Yazı Hareket
    timeline3: null as gsap.core.Timeline | null, // Final Sahne
  })

  // Throttle fonksiyonu - Scroll spam'ini önlemek için
  const throttle = (func: () => void, limit: number) => {
    let inThrottle = false

    return function () {
      if (!inThrottle) {
        func()
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Timeline 1: SVG Büyüme + Yazı + Overlay Kaybolma
  const createSVGScalingWithOverlay = () => {
    const tl = gsap.timeline({ paused: true })

    // Mobile detection ve viewport hesaplama
    const isMobile = window.innerWidth < 768
    const viewportWidth = window.innerWidth

    // SVG'nin başlangıç boyutunu al
    const svgElement = svgRef.current

    if (!svgElement) return tl

    const originalWidth = svgElement.getBoundingClientRect().width || 100

    // Target boyutları hesapla (viewport'un çok fazla üstünde)
    const targetWidth = isMobile
      ? viewportWidth * 100 // Mobile: 100x viewport genişliği
      : viewportWidth * 70 // Desktop: 70x viewport genişliği

    // Başlangıç durumları - width/height kullan
    tl.set(svgRef.current, {
      position: 'absolute',
      left: '50%',
      top: '50%',
      x: '-50%',
      y: '-50%',
      width: originalWidth,
      height: 'auto',
      willChange: 'width',
    })

    tl.set('#the_quite', { opacity: 0 })
    tl.set('#scroll_indicator', { display: 'none' })

    // SVG Büyüme Animasyonu - width kullanarak çözünürlük korunacak
    tl.to(svgRef.current, {
      width: targetWidth,
      duration: isMobile ? 6 : 8,
      ease: 'power2.inOut',
    })

    // Yazı Görünümü
    tl.to(
      '#the_quite',
      {
        opacity: 1,
        duration: 3,
        ease: 'power1.inOut',
      },
      '-=6',
    )

    // Overlay Kaybolma
    tl.to('#overlay', {
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
    })

    // Scroll indicator göster
    tl.set('#scroll_indicator', {
      display: 'block',
      color: '#1c1c1c',
    })

    return tl
  }

  // Timeline 2: Yazı Aşağı Hareket
  const createTextMovement = () => {
    const tl = gsap.timeline({ paused: true })

    tl.to('#the_quite', {
      bottom: '10rem',
      duration: 2,
      ease: 'power2.inOut',
    })

    tl.set('#scroll_indicator', {
      display: 'block',
      color: '#1c1c1c',
    })

    return tl
  }

  // Timeline 3: Final Sahne
  const createFinalScene = () => {
    const tl = gsap.timeline({ paused: true })

    tl.set(scrollRef.current, { display: 'none' })
    tl.set('#scroll_indicator', { display: 'none' })
    tl.set('#overlay', { display: 'none' })
    tl.set('#the_quiet_description', { display: 'flex' })
    tl.to('#the_quiet_description', { opacity: 1, duration: 3, ease: 'power1.inOut' }, '+=2')
    tl.to('#the_quite', { opacity: 0, duration: 1, ease: 'power1.inOut' }, '-=3')
    tl.to('#the_quite_white', { opacity: 1, duration: 3, ease: 'power1.inOut' }, '-=3')
    tl.to('#main', { backgroundColor: '#1c1c1c', duration: 3, ease: 'power1.inOut' }, '-=3')

    return tl
  }

  // Scroll event handler
  const handleScrollEvent = () => {
    const states = timelineStates.current
    const tl = timelines.current

    // Timeline 1 - SVG Büyüme + Yazı + Overlay
    if (!states.timeline1Triggered && showScrollIndicator) {
      states.timeline1Triggered = true
      console.log('📈 Timeline 1 started: SVG Scaling + Text + Overlay')
      tl.timeline1?.play()

      return
    }

    // Timeline 2 - Yazı hareketi
    if (states.timeline1Triggered && !states.timeline2Triggered) {
      if (tl.timeline1?.progress() === 1) {
        states.timeline2Triggered = true
        console.log('⬇️ Timeline 2 started: Text Movement')
        tl.timeline2?.play()
      }

      return
    }

    // Timeline 3 - Final sahne
    if (states.timeline2Triggered && !states.timeline3Triggered) {
      if (tl.timeline2?.progress() === 1) {
        states.timeline3Triggered = true
        console.log('🎬 Timeline 3 started: Final Scene')
        tl.timeline3?.play()
      }
    }
  }

  // Event listener yönetimi
  const setupEventListeners = () => {
    const scrollElement = scrollRef.current

    if (!scrollElement) return () => {}

    // Mobile için daha responsive throttling
    const isMobile = window.innerWidth < 768
    const throttledHandler = throttle(handleScrollEvent, isMobile ? 100 : 100)

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault()
      throttledHandler()
    }

    const touchHandler = (e: TouchEvent) => {
      e.preventDefault()
      throttledHandler()
    }

    scrollElement.addEventListener('wheel', wheelHandler, { passive: false })
    scrollElement.addEventListener('touchstart', touchHandler, { passive: false })

    return () => {
      scrollElement.removeEventListener('wheel', wheelHandler)
      scrollElement.removeEventListener('touchstart', touchHandler)
    }
  }

  // Ana GSAP hook
  useGSAP(
    () => {
      if (!showScrollIndicator || !svgRef.current) return

      // Timeline'ları oluştur
      timelines.current.timeline1 = createSVGScalingWithOverlay() // SVG Büyüme + Yazı + Overlay
      timelines.current.timeline2 = createTextMovement() // Yazı Hareket
      timelines.current.timeline3 = createFinalScene() // Final Sahne

      // Debug için timeline'ları window'a kaydet
      if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        const globalWindow = window as typeof window & {
          scrollTimelines?: typeof timelines.current
          timelineStates?: typeof timelineStates.current
        }

        globalWindow.scrollTimelines = timelines.current
        globalWindow.timelineStates = timelineStates.current
      }

      // Event listener'ları kur
      return setupEventListeners()
    },
    {
      dependencies: [showScrollIndicator],
      scope: homeRef,
    },
  )
}
