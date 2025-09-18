'use client'

import { useEffect, useRef, useState } from 'react'

import { CarouselCard } from '@/components/home/carouselCard'

const homeCarouselData = [
  {
    img: '/home/community-events.svg',
    title: 'community_events',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/community-events.svg',
    title: 'community_events',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/community-events.svg',
    title: 'community_events',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
]

export const HomeCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
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
  ]

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    // Start from middle of the list to allow infinite scrolling
    const middleIndex = Math.floor(list.length / 2)
    const cardWidth = container.scrollWidth / list.length

    container.scrollLeft = middleIndex * cardWidth

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerCenterX = containerRect.left + containerRect.width / 2

      let closestIndex = -1
      let closestDistance = Infinity

      // Her scroll'da tüm card'ları kontrol et
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect()
          const cardCenterX = cardRect.left + cardRect.width / 2
          const distance = Math.abs(containerCenterX - cardCenterX)

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        }
      })

      if (closestIndex !== -1) {
        setActiveIndex(closestIndex)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Debounce - çok hızlı wheel event'lerini engelle
      if (wheelTimeoutRef.current) return

      // Sadece belirli bir threshold'u geçince scroll yap
      if (Math.abs(e.deltaY) < 10) return

      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null
      }, 300) // 300ms debounce

      // Scroll miktarını sınırla - tek card geçişi için
      const direction = e.deltaY > 0 ? 1 : -1
      const scrollAmount = direction * 150 // Card genişliği kadar scroll

      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }

    // Event listener'ları ekle
    container.addEventListener('scroll', handleScroll)
    container.addEventListener('wheel', handleWheel, { passive: false })

    // İlk yüklemede de çalıştır
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('wheel', handleWheel)

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [list.length])

  return (
    <div
      ref={containerRef}
      className=' min-h-dvh flex gap-5 md:gap-12 items-center px-5 md:px-6 py-24 mx-auto md:max-w-[1440px] max-w-[100vw] snap-x snap-mandatory overflow-x-scroll scrollbar-hide'
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

      <div className='absolute top-1/2 left-1/2 border border-offblack-950 w-[430px] h-[calc(100dvh-210px)] max-h-[720px] -translate-x-1/2 -translate-y-1/2 bg-transparent pointer-events-none md:block hidden'></div>
    </div>
  )
}
