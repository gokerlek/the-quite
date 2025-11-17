'use client'

import { UIEvent, useState } from 'react'

import { CarouselCardMobile } from '@/components/home/carouselCardMobile'
import { list } from '@/data/homeCarouselData'

export const MobileHomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollTop = container.scrollTop
    const cardHeight = 453
    const gap = 16 // gap-4 = 1rem = 16px
    const cardWithGap = cardHeight + gap

    // Calculate which card's center is closest to top-20 position
    const newActiveIndex = Math.round(scrollTop / cardWithGap)

    setActiveIndex(newActiveIndex)
  }

  return (
    <div className='relative h-dvh w-full'>
      <div
        className='grid gap-4 h-dvh overflow-scroll snap-y snap-mandatory p-4 scrollbar-hide place-items-center translate-y-28'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >
        {list.map((data, index) => (
          <div key={`${data.title}-${index}`} className='snap-start h-[453px] w-[296px]'>
            <CarouselCardMobile {...data} isActive={index === activeIndex} />
          </div>
        ))}
      </div>

      <div className='fixed top-28  right-1/2 translate-x-1/2 border  h-[453px] w-[296px] pointer-events-none' />
    </div>
  )
}
