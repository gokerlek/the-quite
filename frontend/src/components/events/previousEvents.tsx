'use client'

import { useState } from 'react'
import Image from 'next/image'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'

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
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const text = 'count/total'

  return (
    <div className='flex h-[600px] w-full gap-10'>
      {/* Left Content Area */}
      <div className='w-2/5  flex flex-col justify-between '>
        <div className='flex flex-col gap-4'>
          <h2 className='text-7xl font-lemon mb-4'>
            {text
              .replace('count', (currentIndex + 1) as unknown as string)
              .replace('total', data.length as unknown as string)}
          </h2>

          <Text variant='pL'>{data[currentIndex].desc}</Text>
        </div>

        {/* Navigation Controls */}
        <div className='flex gap-4'>
          <Button
            variant='outline'
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='px-2'
          >
            <Image src='/events/left.svg' alt='left' width={36} height={36} />
          </Button>

          <Button
            variant='outline'
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className='px-2'
          >
            <Image src='/events/right.svg' alt='left' width={36} height={36} />
          </Button>
        </div>
      </div>

      {/* Right Carousel Area */}
      <div className='w-3/5 relative overflow-hidden'>
        <div className='carousel-container h-full flex items-start justify-start'>
          {data.map((event, index) => {
            const position = index - currentIndex
            const isActive = index === currentIndex

            return (
              <motion.div
                key={event.id}
                className='absolute'
                animate={{
                  x: position * 340,
                  scale: isActive ? 1 : 0.4,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className='aspect-4/5 w-md relative'>
                  <Image src={event.img} alt={event.name} fill className='object-cover' />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
