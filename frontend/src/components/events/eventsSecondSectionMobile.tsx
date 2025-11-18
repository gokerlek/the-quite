'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'

export default function EventsSecondSectionMobile() {
  const router = useRouter()
  const t = useTranslations('events')
  const augustRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id='second-section'
      className='flex flex-col items-center justify-start  h-dvh max-h-dvh  gap-5 '
    >
      <div className='h-20' />

      <div ref={augustRef} id='agust' className='text-richcarmine-800 heading-m'>
        10 AUGUST 26
      </div>

      <div className='aspect-2/3 max-h-[70dvh] h-[60dvh] relative'>
        <Image src='/events/mock.png' alt='events' fill={true} className='object-cover' />
      </div>

      <Button
        variant='default'
        onClick={() => router.push('/invitation')}
        className='text-sm font-normal h-9 px-3'
      >
        {t('button')}
      </Button>
    </section>
  )
}
