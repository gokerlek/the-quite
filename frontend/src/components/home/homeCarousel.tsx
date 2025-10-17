'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useTranslations } from 'use-intl'

import { CarouselCard } from '@/components/home/carouselCard'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Helpers moved to module scope to avoid useEffect dependency noise
const getViewportCenterX = () => (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)

const getCardCenterViewportX = (el: HTMLDivElement | null) => {
  if (!el) return Number.POSITIVE_INFINITY

  const rect = el.getBoundingClientRect()

  return rect.left + rect.width / 2
}

const homeCarouselData = [
  {
    img: '/home/community-events.svg',
    title: 'community_events.title',
    subtitle: 'community_events.subtitle',
    description: 'community_events.desc',
    href: '/socaity-events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design.title',
    subtitle: 'journey_design.subtitle',
    description: 'journey_design.desc',
    href: '/journey-design',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization.title',
    subtitle: 'event_organization.subtitle',
    description: 'event_organization.desc',
    href: '/event-organization',
  },
]

const list = [
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
  ...homeCarouselData,
]

export const HomeCarousel = () => {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateActiveIndexByCenter = useCallback(() => {
    const center = getViewportCenterX()
    let closestIdx = 0
    let closestDist = Number.POSITIVE_INFINITY

    cardRefs.current.forEach((card, idx) => {
      const c = getCardCenterViewportX(card)
      const dist = Math.abs(c - center)

      if (dist < closestDist) {
        closestDist = dist
        closestIdx = idx
      }
    })

    setActiveIndex(closestIdx)
  }, [])

  const snapToClosestCard = useCallback(() => {
    const el = containerRef.current

    if (!el) return

    const viewportCenter = getViewportCenterX()
    let targetCardCenterVp = viewportCenter
    let closestDist = Number.POSITIVE_INFINITY

    cardRefs.current.forEach((card) => {
      const cVp = getCardCenterViewportX(card)
      const dist = Math.abs(cVp - viewportCenter)

      if (dist < closestDist) {
        closestDist = dist
        targetCardCenterVp = cVp
      }
    })

    // Compute required scrollLeft to bring target card center to viewport center
    const delta = targetCardCenterVp - viewportCenter
    const targetScrollLeft = Math.max(0, el.scrollLeft + delta)

    gsap.killTweensOf(el)
    gsap.to(el, {
      duration: 0.6,
      ease: 'power3.out',
      scrollTo: { x: targetScrollLeft },
    })
  }, [])

  useEffect(() => {
    // Ensure GSAP ScrollToPlugin is registered on client
    gsap.registerPlugin(ScrollToPlugin)

    const el = containerRef.current

    if (!el) return

    // Handle wheel -> horizontal scroll
    const onWheel = (e: WheelEvent) => {
      // allow shift+wheel native horizontal scroll
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

      // Prevent page vertical scrolling when hovering the carousel
      e.preventDefault()

      // Cancel any ongoing GSAP tween when the user interacts
      gsap.killTweensOf(el)

      el.scrollLeft += delta
      updateActiveIndexByCenter()

      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)

      wheelTimeoutRef.current = setTimeout(() => {
        snapToClosestCard()
      }, 120)
    }

    const onScroll = () => {
      updateActiveIndexByCenter()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', onScroll)
    window.addEventListener('resize', updateActiveIndexByCenter)

    // Initialize active index on mount
    updateActiveIndexByCenter()

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateActiveIndexByCenter)

      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
    }
  }, [updateActiveIndexByCenter, snapToClosestCard])

  return (
    <div
      ref={containerRef}
      className='relative min-h-dvh flex gap-5 md:gap-12 items-center justify-center px-5 md:px-6 py-24 mx-auto md:max-w-[73.5rem] max-w-[100vw] overflow-x-scroll scrollbar-hide'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {list.map((data, index) => {
        return (
          <CarouselCard
            {...data}
            key={`${data.title}-${index}`}
            isActive={index === activeIndex}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
          />
        )
      })}

      <div className='fixed top-1/2 left-1/2 z-30 border border-offblack-950 w-[22.5rem] min-w-[22.5rem] h-[37.5rem] -translate-x-1/2 -translate-y-1/2 bg-transparent  md:block hidden'>
        <Link
          className={cn(
            buttonVariants(),
            'absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer',
          )}
          href={list[activeIndex]?.href || '/'}
        >
          {t('discover')}
        </Link>
      </div>
    </div>
  )
}
