'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'
import { useWordChangeAnimation } from '@/hooks/useWordChangeAnimation'

export default function EventsPage() {
  const words = useMemo(() => ['world', 'moment', 'action', 'science'], [])
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const t = useTranslations('events')

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const { currentIndex, containerRef, currentWordRef, nextWordRef, hasCompletedCycle } =
    useWordChangeAnimation({
      words,
      scrollThreshold: 100,
      autoPlay: isMobile,
      autoPlayInterval: 2500,
    })

  // Mobilde tüm kelimeler geçene kadar scroll'u engelle
  useEffect(() => {
    if (!isMobile) return

    const preventScroll = (e: TouchEvent | WheelEvent) => {
      if (!hasCompletedCycle) {
        e.preventDefault()
      }
    }

    if (!hasCompletedCycle) {
      document.addEventListener('touchmove', preventScroll, { passive: false })
      document.addEventListener('wheel', preventScroll, { passive: false })
    }

    return () => {
      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('wheel', preventScroll)
    }
  }, [isMobile, hasCompletedCycle])

  // Poster animasyonu için ScrollTrigger
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    ScrollTrigger.create({
      trigger: '#agust',
      start: 'top top',
      end: '+=2000',
      scrub: 2,
      pin: '#second-section',
      onUpdate: (self) => {
        const progress = self.progress
        const width = 100 - progress * 75

        gsap.set('#poster', {
          width: `${width}%`,
          transformOrigin: 'top center',
        })
      },
      onEnter: () => {
        // AUGUST yukarı dayandığında otomatik scroll başlat
        gsap.to(window, {
          scrollTo: { y: '+=2000', autoKill: false },
          duration: 3,
          ease: 'power2.inOut',
        })
      },
    })
  })

  return (
    <div>
      <section className='min-h-[calc(100dvh-9.375rem)] md:min-h-[calc(100dvh-13.75rem)] flex items-center justify-center'>
        <div className='md:text-5xl text-3xl flex items-center justify-center gap-4 font-[400]'>
          <span>The</span>

          <div ref={containerRef} className='h-8 w-fit flex items-center justify-center'>
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

      <section className='relative md:w-[28.5rem] md:h-[28.5rem] h-[18.75rem] w-[18.75rem] mx-auto'>
        <Image src={'/events/icon.svg'} alt={'icon'} fill className='object-cover' />
      </section>

      <section
        id='second-section'
        className='flex flex-col items-center justify-start sticky top-10 text-5xl md:text-120 font-[300] font-lemon'
      >
        <div id='agust' className='text-richcarmine-800'>
          AUGUST
        </div>

        <div className='flex gap-5 items-center justify-center w-full'>
          <div className='min-w-max '>10</div>

          <div id='poster' className='w-full flex flex-col gap-5 items-center justify-center'>
            <div className='aspect-2/3 w-full relative'>
              <Image src='/events/mock.png' alt='events' fill={true} className='object-cover' />
            </div>

            <Button
              variant='default'
              className='text-lg font-light'
              onClick={() => router.push('/invitation')}
            >
              {t('button')}
            </Button>
          </div>

          <div className='min-w-max'>26</div>
        </div>
      </section>
    </div>
  )
}
