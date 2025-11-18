'use client'

import { useMemo } from 'react'
import Image from 'next/image'

import EventsSecondSection from '@/components/events/eventsSecondSection'
import EventsSecondSectionMobile from '@/components/events/eventsSecondSectionMobile'
import { useMobileDetection } from '@/hooks/useMobileDetection'
import { useWordChangeAnimation } from '@/hooks/useWordChangeAnimation'

export default function EventsPage() {
  const words = useMemo(() => ['world', 'moment', 'action', 'science'], [])
  const isMobile = useMobileDetection()

  const { currentIndex, containerRef, currentWordRef, nextWordRef } = useWordChangeAnimation({
    words,
    scrollThreshold: 100,
    autoPlay: isMobile,
    autoPlayInterval: 2500,
  })

  return (
    <div>
      <section className='min-h-[calc(100dvh-9.375rem)] md:min-h-[calc(100dvh-13.75rem)] flex items-center justify-center'>
        <div className='md:text-5xl text-3xl flex items-center justify-center md:gap-4 gap-2 font-[400]'>
          <span>The</span>

          <div ref={containerRef} className='h-8 w-fit flex items-center justify-center'>
            <div className='grid grid-cols-1 grid-rows-1 place-items-center w-fit h-full'>
              <span
                ref={currentWordRef}
                className='col-start-1 row-start-1 text-richcarmine-500 whitespace-nowrap font-montagne pr-4'
              >
                {words[currentIndex]}
              </span>

              <span
                ref={nextWordRef}
                className='col-start-1 row-start-1 text-richcarmine-500 whitespace-nowrap font-montagne pr-4'
              />
            </div>
          </div>

          <span>around us.</span>
        </div>
      </section>

      <section className='relative md:w-[28.5rem] md:h-[28.5rem] h-[18.75rem] w-[18.75rem] mx-auto'>
        <Image src={'/events/icon.svg'} alt={'icon'} fill className='object-cover' />
      </section>

      {isMobile ? <EventsSecondSectionMobile /> : <EventsSecondSection />}
    </div>
  )
}
