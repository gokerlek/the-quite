'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'

// Previous Events is a gallery with description.

const data = [
  {
    name: 'event 1',
    desc: 'This event',
    img: '/events/mock.png',
  },
  {
    name: 'event 2',
    desc: 'This event',
    img: '/events/mock2.png',
  },
  {
    name: 'event 3',
    desc: 'This event',
    img: '/events/mock.png',
  },
  {
    name: 'event 4',
    desc: 'This event',
    img: '/events/mock2.png',
  },
  {
    name: 'event 5',
    desc: 'This event',
    img: '/events/mock.png',
  },
  {
    name: 'event 6',
    desc: 'This event',
    img: '/events/mock2.png',
  },
  {
    name: 'event 7',
    desc: 'This event',
    img: '/events/mock.png',
  },
]

export const PreviousEvents = () => {
  return (
    <div className='flex'>
      <div>info area and prev next buttons</div>

      <div>gsap horizantal image galery.</div>
    </div>
  )
}
