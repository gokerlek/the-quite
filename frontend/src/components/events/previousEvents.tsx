'use client'

import { useState } from 'react'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'
import { useMobileDetection } from '@/hooks/useMobileDetection'

const data = [
  {
    id: 1,
    name: 'event 1',
    desc: 'This event description goes here with more details about what happened during this amazing event.',
    img: '/events/mock.png',
  },
  {
    id: 2,
    name: 'event 2',
    desc: 'Another exciting event that brought people together for an unforgettable experience.',
    img: '/events/mock2.png',
  },
  {
    id: 3,
    name: 'event 3',
    desc: 'A remarkable gathering that showcased incredible talent and creativity.',
    img: '/events/mock.png',
  },
  {
    id: 4,
    name: 'event 4',
    desc: 'An inspiring event that left lasting memories for all attendees.',
    img: '/events/mock2.png',
  },
  {
    id: 5,
    name: 'event 5',
    desc: 'A unique celebration that highlighted community spirit and collaboration.',
    img: '/events/mock.png',
  },
  {
    id: 6,
    name: 'event 6',
    desc: 'An extraordinary event that pushed boundaries and created new possibilities.',
    img: '/events/mock2.png',
  },
  {
    id: 7,
    name: 'event 7',
    desc: 'A spectacular finale that perfectly concluded our series of events.',
    img: '/events/mock.png',
  },
]

export const PreviousEvents = () => {
  const t = useTranslations('events')
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMobileDetection()

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // const text = 'count/total'

  return (
    <>
      <div className='block md:hidden h-20 min-h-20' />

      <div className='flex md:flex-row flex-col md:h-[39.375rem] h-fit  md:my-auto w-full gap-10'>
        {/* Left Content Area */}
        <div className='w-full md:w-2/5  flex flex-col justify-between '>
          <div className='flex flex-col gap-4'>
            <div className='heading-xxs-light md:heading-s-light'>{t('previous_events')}</div>

            <div className='p-xs md:p-l'>{data[currentIndex].desc}</div>
          </div>

          {/* Navigation Controls */}
          <div className='md:flex gap-1 hidden'>
            <Button
              variant='outline'
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className='px-2'
            >
              <div className='relative h-9 w-9'>
                <Image src='/events/left.svg' alt='left' fill className='object-cover' />
              </div>
            </Button>

            <Button
              variant='outline'
              onClick={handleNext}
              disabled={currentIndex === data.length - 1}
              className='px-2'
            >
              <div className='relative h-9 w-9'>
                <Image src='/events/right.svg' alt='left' fill className='object-cover' />
              </div>
            </Button>
          </div>
        </div>

        {/* Right Carousel Area */}
        <div className='w-[90vw] md:w-3/5 relative overflow-hidden'>
          <div className='carousel-container md:h-full h-[23.75rem] flex items-start justify-start'>
            {data.map((event, index) => {
              const position = index - currentIndex
              const isActive = index === currentIndex

              return (
                <motion.div
                  key={event.id}
                  className='absolute'
                  animate={{
                    x: position * (isMobile ? 240 : 420),
                    scale: isActive ? 1 : isMobile ? 0.8 : 0.6,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div className='aspect-[2/3] md:w-[26.25rem] w-64 relative'>
                    <Image src={event.img} alt={event.name} fill className='object-cover' />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className='flex justify-center gap-1 md:hidden'>
          <Button
            variant='outline'
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='px-2'
          >
            <div className='relative h-9 w-9'>
              <Image src='/events/left.svg' alt='left' fill className='object-cover' />
            </div>
          </Button>

          <Button
            variant='outline'
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className='px-2'
          >
            <div className='relative h-9 w-9'>
              <Image src='/events/right.svg' alt='left' fill className='object-cover' />
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}
