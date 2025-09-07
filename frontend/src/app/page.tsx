'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      gsap
        .timeline()
        .set('#quiet-drawing-logo', { opacity: 1 })
        .fromTo(
          '#quiet-drawing-logo path',
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 6, ease: 'sine.inOut' },
        )
        // Show the indicator when the visually noticeable part ends (~2s)
        .call(
          () => {
            setShowScrollIndicator(true)
          },
          undefined,
          2,
        )
    },
    {
      scope: containerRef,
      dependencies: [isClient],
    },
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
            <svg
              ref={svgRef}
              id='quiet-drawing-logo'
              viewBox='0 0 860 654'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] pointer-events-none min-w-40'
              shapeRendering='geometricPrecision'
              opacity={0}
            >
              <path
                d='M736.96 4.33984H122.99L3.74998 123.58V530.4L122.99 649.64H736.96L856.26 530.4V123.58L736.96 4.33984ZM736.96 4.33984L726.33 29.9698M726.33 29.9698H133.69M726.33 29.9698L830.57 134.21V519.7L726.33 623.94V624H133.69L29.39 519.7V134.27L133.69 29.9698M133.69 29.9698L124.1 4.33984M856.27 123.6L830.57 134.24M830.57 519.71L856.27 530.35M726.32 623.97L736.96 649.66M133.68 623.97L123.04 649.66M29.43 519.71L3.72998 530.35M29.43 134.24L3.72998 123.6M184.44 325.55C184.71 326.04 185 326.53 185.27 327.01M185.27 327.01C216.26 380.55 274.13 416.57 340.43 416.57M185.27 327.01C216.24 273.46 274.13 237.44 340.43 237.44M185.27 327.01C185 327.49 184.71 327.97 184.44 328.46M340.43 416.57C373.05 416.57 403.66 407.85 430 392.61M340.43 416.57C340.43 383.95 349.15 353.36 364.39 327.01M340.43 416.57C340.43 482.87 376.45 540.76 430 571.73M430 392.61C457.19 376.86 479.85 354.2 495.59 327.01M430 392.61C402.81 376.88 380.14 354.2 364.39 327.01M430 392.61C456.35 407.85 486.92 416.57 519.56 416.57M495.59 327.01C510.83 300.66 519.56 270.07 519.56 237.44M495.59 327.01C510.84 353.36 519.56 383.95 519.56 416.57M495.59 327.01C479.87 299.82 457.2 277.14 430 261.41M519.56 237.44C519.56 171.14 483.54 113.25 430 82.2698M519.56 237.44C585.87 237.44 643.76 273.46 674.73 327.01M519.56 237.44C486.92 237.44 456.35 246.16 430 261.41M430 82.2698C429.52 81.9998 429.04 81.7199 428.57 81.4499M430 82.2698C430.46 81.9998 430.94 81.7199 431.42 81.4499M430 82.2698C376.45 113.24 340.43 171.13 340.43 237.44M340.43 237.44C340.43 270.08 349.15 300.67 364.39 327.01M340.43 237.44C373.05 237.44 403.65 246.17 430 261.41M364.39 327.01C380.12 299.8 402.79 277.13 430 261.41M519.56 416.57C585.86 416.57 643.75 380.55 674.73 327.01M519.56 416.57C519.56 482.87 483.54 540.74 430 571.73M674.73 327.01C675 326.53 675.28 326.05 675.55 325.58M674.73 327.01C675 327.47 675.28 327.95 675.55 328.43M428.54 572.56C429.03 572.29 429.52 572 430 571.73M430 571.73C430.48 572.02 430.96 572.29 431.45 572.56M256.41 500.61L603.6 153.41M603.6 500.61L256.41 153.41M29.39 327.01H195.51M667.68 327.01H833.8M431.59 60.1599V29.9798M431.59 624.76V593.84M619.09 518.84L727.48 627.24M131.37 31.1299L239.77 139.52M619.09 139.52L727.48 31.1299M131.37 627.24L239.77 518.84M430 593.84C282.86 593.84 163.16 474.14 163.16 327C163.16 179.86 282.86 60.1599 430 60.1599C577.14 60.1599 696.84 179.86 696.84 327C696.84 474.14 577.14 593.84 430 593.84ZM675.56 327C675.56 462.619 565.619 572.56 430 572.56C294.381 572.56 184.44 462.619 184.44 327C184.44 191.381 294.381 81.4398 430 81.4398C565.619 81.4398 675.56 191.381 675.56 327Z'
                strokeWidth='7.5'
                className='stroke-offblack-50'
                strokeMiterlimit='10'
                fill='none'
              />
            </svg>
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
