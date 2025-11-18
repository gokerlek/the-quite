'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'

export default function EventsSecondSection() {
  const router = useRouter()
  const t = useTranslations('events')
  const augustRef = useRef<HTMLDivElement>(null)

  // AUGUST tepeye dayandığında smooth poster animasyonu
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    ScrollTrigger.create({
      trigger: '#second-section',
      start: 'top top',
      pin: '#second-section',
    })

    // AUGUST tepeye dayandığında otomatik timeline başlat
    ScrollTrigger.create({
      trigger: '#agust',
      start: 'top top',
      onEnter: () => {
        const timeline = gsap.timeline()
        const targetWidth = window.innerHeight * 0.7 * (2 / 3) // Aspect ratio 2:3

        timeline.to('#poster', {
          width: `${targetWidth}px`,
          duration: 2,
          ease: 'power2.out',
          transformOrigin: 'top center',
        })
      },
      onLeaveBack: () => {
        const timeline = gsap.timeline()

        timeline.to('#poster', {
          width: '100%',
          duration: 2,
          ease: 'power2.out',
          transformOrigin: 'top center',
        })
      },
    })
  })

  return (
    <section
      id='second-section'
      className='flex flex-col items-center justify-start sticky top-10 text-5xl md:text-120 font-[300] font-lemon h-screen max-h-screen'
    >
      <div ref={augustRef} id='agust' className='text-richcarmine-800'>
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
  )
}
