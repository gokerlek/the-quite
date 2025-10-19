import React from 'react'
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card'

export default function DraggableCardDemo() {
  const items = [
    {
      title: 'Card 03',
      image: '/draggable-cards/03.svg',
      className: 'absolute top-1/2 left-[40%] -translate-y-1/2 rotate-[8.18 deg]',
    },
    {
      title: 'Card 04',
      image: '/draggable-cards/04.svg',
      className: 'absolute top-1/2 left-[40%] -translate-y-1/2 rotate-[-6.15 deg]',
    },
    {
      title: 'Card 05',
      image: '/draggable-cards/05.svg',
      className: 'absolute top-1/2 left-[40%] -translate-y-1/2 rotate-[-17.22 deg]',
    },
    {
      title: 'Card 06',
      image: '/draggable-cards/06.svg',
      className: 'absolute top-1/2 left-[40%] -translate-y-1/2 rotate-[10.04 deg]',
    },
  ]
  return (
    <DraggableCardContainer className='relative flex min-h-screen w-full items-center justify-center overflow-clip'>
      <p className='absolute top-1/2  -translate-y-3/4 text-center h5'>
        Where you <span className='text-red-500'>want</span> to be ?
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className='pointer-events-none relative z-10 h-60 w-60 object-cover '
            style={{ filter: 'drop-shadow(0px 12px 20px #00000040)' }}
          />
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}
