import React from 'react'
import Image from 'next/image'

import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card'
import { cn } from '@/lib/utils'

export default function DraggableCardDemo() {
  const items = [
    {
      title: 'Card 06',
      image: '/draggable-cards/temple.png',
      className: 'rotate-[6.15deg]',
    },
    {
      title: 'Card 03',
      image: '/draggable-cards/hause.png',
      className: 'rotate-[-8.18deg]',
    },
    {
      title: 'Card 04',
      image: '/draggable-cards/circle.png',
      className: 'rotate-[17.22deg]',
    },
    {
      title: 'Card 05',
      image: '/draggable-cards/door.png',
      className: 'rotate-[-10.04deg]',
    },
  ]

  return (
    <DraggableCardContainer className='relative flex min-h-screen w-full items-center justify-center overflow-clip'>
      <p className='absolute top-1/2  -translate-y-3/4 text-center md:text-5xl text-3xl font-light '>
        Where you <span className='text-red-500 font-montagne'>want</span> to be?
      </p>

      {items.map((item) => (
        <DraggableCardBody
          key={item.title}
          className={cn(item.className, 'absolute top-1/2 md:left-[43%] -translate-y-1/2 ')}
        >
          <div className='relative  text-center pointer-events-none   aspect-[calc(1440/1024)]  w-[15rem] shadow-[0_5px_15px_rgba(0,0,0,0.35)]'>
            <Image src={item.image} alt={item.title} fill className=' object-cover' />
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}
