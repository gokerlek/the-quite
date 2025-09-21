'use client'

import { useMemo } from 'react'
import Image from 'next/image'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useWordChangeAnimation } from '@/hooks/useWordChangeAnimation'

export default function EventsPage() {
  const words = useMemo(() => ['world', 'moment', 'action', 'science'], [])
  const { currentIndex, containerRef, currentWordRef, nextWordRef } = useWordChangeAnimation({
    words,
    scrollThreshold: 100,
  })

  // Poster animasyonu için ScrollTrigger
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#agust',
      start: 'top top',
      end: '+=1000',
      scrub: 2,
      pin: '#second-section',
      onUpdate: (self) => {
        const progress = self.progress
        const width = 100 - progress * 60

        gsap.set('#poster', {
          width: `${width}%`,
          transformOrigin: 'top center',
        })
      },
    })
  })

  return (
    <div>
      <section className='min-h-[calc(100dvh-222px)] md:min-h-[calc(100dvh-322px)] flex items-center justify-center'>
        <div className='md:text-5xl text-3xl flex items-center justify-center gap-4 font-[400]'>
          <span>The</span>

          <div ref={containerRef} className='h-32 w-fit flex items-center justify-center'>
            <div className='grid grid-cols-1 grid-rows-1 place-items-center w-fit h-full'>
              <span
                ref={currentWordRef}
                className='col-start-1 row-start-1 text-richcarmine-500 whitespace-nowrap font-montagne'
              >
                {words[currentIndex]}
              </span>

              <span
                ref={nextWordRef}
                className='col-start-1 row-start-1 text-richcarmine-500 whitespace-nowrap font-montagne'
              />
            </div>
          </div>

          <span>around us.</span>
        </div>
      </section>

      <section
        id='second-section'
        className='flex flex-col items-center justify-start sticky top-0 text-5xl md:text-[120px] font-[300] font-lemon'
      >
        <Image src={'/events/icon.svg'} alt={'icon'} width={456} height={456} className='mb-20' />

        <div id='agust'>AGUST</div>

        <div className='flex gap-5 items-center justify-center w-full'>
          <div className='min-w-max'>10</div>

          <div id='poster' className='aspect-2/3 w-full bg-red-400'></div>

          <div className='min-w-max'>26</div>
        </div>
      </section>
    </div>
  )
}
