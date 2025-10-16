'use client'

import { useEffect, useRef, useState } from 'react'

import { CarouselCard } from '@/components/home/carouselCard'

const homeCarouselData = [
  {
    img: '/home/community-events.svg',
    title: 'community_events.title',
    subtitle: 'community_events.subtitle',
    description: 'community_events.desc',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design.title',
    subtitle: 'journey_design.subtitle',
    description: 'journey_design.desc',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization.title',
    subtitle: 'event_organization.subtitle',
    description: 'event_organization.desc',
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
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
    // ...homeCarouselData,
  ]

  return (
    <div
      ref={containerRef}
      className=' min-h-dvh flex gap-5 md:gap-12 items-center justify-center px-5 md:px-6 py-24 mx-auto md:max-w-[91.5rem] max-w-[100vw] overflow-x-scroll scrollbar-hide'
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

      <div className='absolute top-1/2 left-1/2 border border-offblack-950 w-[22.5rem] min-w-[22.5rem] h-[37.5rem] -translate-x-1/2 -translate-y-1/2 bg-transparent pointer-events-none md:block hidden'></div>
    </div>
  )
}
