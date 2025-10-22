'use client'

import React from 'react'

import { Circle } from '@/components/society-events/circle'

export default function DemoPage() {
  return (
    <section id='room-cotainer' className='ablosute inset-0 z-10'>
      <svg viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <Circle id='room' />
      </svg>
    </section>
  )
}
