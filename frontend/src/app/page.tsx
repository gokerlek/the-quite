'use client'

import { useRef } from 'react'

import { HeroLogo } from '@/components/home/heroLogo'
import { HomeCarousel } from '@/components/home/homeCarousel'
import { ScrollIndicator } from '@/components/home/scrollIndicator'
import { TheQuietDescription } from '@/components/home/theQuietDescription'
import { TheQuiteWordmark } from '@/components/home/theQuiteWordmark'
import { TheQuiteWordmarkWhite } from '@/components/home/theQuiteWordmarkWhite'
import Layout from '@/components/layout'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { useLoadingState } from '@/hooks/useLoadingState'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null)
  const scrollRef = useRef<HTMLElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const { loaded, endLoading } = useLoadingState()
  const { showScrollIndicator } = useHeroAnimation(containerRef, true)

  useScrollAnimation(containerRef, scrollRef, svgRef, showScrollIndicator)

  return loaded ? (
    <HomeCarousel />
  ) : (
    <Layout>
      <section id='main' className='min-h-dvh flex flex-col relative h-dvh overflow-hidden'>
        <div id='overlay' className='absolute inset-0 bg-offblack-950  '></div>

        <section
          ref={scrollRef}
          className='h-dvh overflow-y-auto overflow-x-hidden touch-pan-y absolute inset-0 '
          aria-label='Scroll Container'
        >
          <section
            ref={containerRef}
            className='relative min-h-dvh bg-transparent overflow-hidden z-10'
            aria-label='Hero Logo Section'
          >
            <HeroLogo ref={svgRef} />
          </section>

          {/* Spacer to allow scroll once enabled */}
          <div
            className={cn({
              'h-[400dvh]': showScrollIndicator,
              'h-0': !showScrollIndicator,
            })}
          />

          {showScrollIndicator && <ScrollIndicator />}
        </section>

        <TheQuiteWordmark />
      </section>

      <TheQuietDescription onDiscoverAction={endLoading} />

      <TheQuiteWordmarkWhite />
    </Layout>
  )
}
