'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { HeroLogo } from '@/components/home/heroLogo'
import { HomeCarousel } from '@/components/home/homeCarousel'
import { ScrollIndicator } from '@/components/home/scrollIndicator'
import { TheQuietDescription } from '@/components/home/theQuietDescription'
import { TheQuiteWordmark } from '@/components/home/theQuiteWordmark'
import { TheQuiteWordmarkWhite } from '@/components/home/theQuiteWordmarkWhite'
import Layout from '@/components/layout'
import { useIsClient } from '@/hooks/useIsClient'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null)
  const scrollRef = useRef<HTMLElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const isClient = useIsClient()

  const endLoading = useCallback(() => {
    setLoading(false)

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('loaded', 'true')
      } catch {}
    }
  }, [])

  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      setLoadedFromStorage(window.localStorage.getItem('loaded') === 'true')
    } catch {
      setLoadedFromStorage(false)
    }
  }, [])

  const loaded = loadedFromStorage || !loading

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // SVG görünür olsun ama path'ler çizilmesin
      tl.set('#quiet-drawing-logo', { opacity: 1 })
      tl.set('#quiet-drawing-logo path', { drawSVG: '50% 50%' })

      // 1) iç karmaşık
      tl.to('#quiet-drawing-logo path.core', {
        drawSVG: '0% 100%',
        duration: 2,
        ease: 'sine.inOut',
      })

      // 2) halka
      tl.to(
        '#quiet-drawing-logo path.ring',
        {
          drawSVG: '0% 100%',
          duration: 2,
          ease: 'sine.inOut',
        },
        '>-0.2',
      )

      // 3) dış çerçeve
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

  // Scroll-driven scale up after animation completes
  useGSAP(
    () => {
      if (!showScrollIndicator) return

      if (!svgRef.current) return

      const el = scrollRef.current

      if (!el) return

      const onScroll = () => {
        const max = Math.max(0, el.scrollHeight - el.clientHeight)
        const y = el.scrollTop || 0
        const p = max > 0 ? Math.min(1, y / max) : 0
        const widthVW = 20 + p * (15000 - 20)

        // Update SVG width based on scroll progression
        gsap.set(svgRef.current!, { width: `${widthVW}vw` })

        // Overlay fade-out starts when 20% of scroll remains (p >= 0.8)
        // Opacity stays at 1 until p = 0.8, then linearly goes to 0 at p = 1.0
        const startFade = 0.9
        const overlayOpacity =
          p < startFade ? 1 : Math.max(0, 1 - (p - startFade) / (1 - startFade))

        gsap.set('#overlay', { opacity: overlayOpacity })

        // Update #the_quite opacity based on scroll progress: 0->1 as p goes 0.6->0.7
        const fadeStartP = 0.05
        const fadeEndP = 0.15
        const t =
          p <= fadeStartP ? 0 : p >= fadeEndP ? 1 : (p - fadeStartP) / (fadeEndP - fadeStartP)

        gsap.set('#the_quite', { opacity: t })

        // Update scroll indicator text color when progress reaches 0.9
        const indicatorColor = p >= 0.6 ? '#1c1c1c' : ''

        gsap.set('#scroll_indicator', { color: indicatorColor })

        // Move #the_quite bottom from 50% to 10rem when p goes 0.9 -> 1.0
        const u = Math.min(1, Math.max(0, (p - 0.9) / 0.1))
        const bottomInterpolated = u < 1 ? `calc(${(1 - u) * 50}% + ${u * 10}rem)` : '10rem'

        gsap.set('#the_quite', { bottom: bottomInterpolated })

        // When animation completes, remove scroll container and hide the indicator
        if (p >= 1) {
          gsap.set(el, { display: 'none' })
          gsap.set('#scroll_indicator', { display: 'none' })
          gsap.set('#overlay', { display: 'none' })
          gsap.set('#the_quiet_description', { display: 'flex' })

          // Run final transition only once (starts after 2s delay, lasts 3s)
          const g = globalThis as unknown as { __finalized__?: boolean }

          if (!g.__finalized__) {
            g.__finalized__ = true
            const tl = gsap.timeline({ delay: 2, defaults: { duration: 3, ease: 'power1.inOut' } })

            // 1) Fade in description
            tl.to('#the_quiet_description', { opacity: 1 }, 0)
            tl.to('#the_quite', { opacity: 0 }, 0)
            tl.to('#the_quite_white', { opacity: 1 }, 0)

            // 2) Change the_quite color to #ededed (its SVG has fill via class, override with inline fill)
            // gsap.set('#the_quite', { display: 'none' })

            // 3) Change #main background color to #1c1c1c
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

      // initialize at top
      onScroll()

      el.addEventListener('scroll', onScroll, { passive: true })

      return () => el.removeEventListener('scroll', onScroll)
    },
    { dependencies: [showScrollIndicator], scope: containerRef },
  )

  if (!isClient) {
    return <div>loading</div>
  }

  return loaded ? (
    <HomeCarousel />
  ) : (
    <Layout>
      <section id='main' className='min-h-screen flex flex-col relative h-screen overflow-hidden'>
        <div id='overlay' className='absolute inset-0 bg-offblack-950  '></div>

        <section
          ref={scrollRef}
          className='h-screen overflow-y-auto overflow-x-hidden touch-pan-y absolute inset-0 '
          aria-label='Scroll Container'
        >
          <section
            ref={containerRef}
            className='relative min-h-screen bg-transparent overflow-hidden z-10'
            aria-label='Hero Logo Section'
          >
            <HeroLogo ref={svgRef} />
          </section>

          {/* Spacer to allow scroll once enabled */}
          <div
            className={cn({
              'h-[400vh]': showScrollIndicator,
              'h-0': !showScrollIndicator,
            })}
          />

          {showScrollIndicator && <ScrollIndicator />}
        </section>

        <TheQuiteWordmark />
      </section>

      <TheQuietDescription onDiscover={endLoading} />

      <TheQuiteWordmarkWhite />
    </Layout>
  )
}
