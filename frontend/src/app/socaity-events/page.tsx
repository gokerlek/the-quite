'use client'

import { useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import LeftDoor from '@/components/society-events/leftDoor'
import LeftStar from '@/components/society-events/leftStar'
import LeftVase from '@/components/society-events/leftVase'
import MainWall from '@/components/society-events/mainWall'
import RightDoor from '@/components/society-events/rightDoor'
import RightStar from '@/components/society-events/rightStar'
import RightVase from '@/components/society-events/rightVase'
import Room from '@/components/society-events/room'

export default function SocietyEventsPage() {
  const [isPulseActive, setIsPulseActive] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // 1 saniye sonra animasyonu başlat
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useGSAP(
    () => {
      if (!isPulseActive || !startAnimation) return

      const leftDoor = document.querySelector('#left-door') as SVGSVGElement

      if (leftDoor) {
        // Kapı genişliğini hesapla
        const doorWidth = leftDoor.getBoundingClientRect().width
        const pulseDistance = doorWidth * 0.15 // %15'lik hareket

        // Loop aç-kapat animasyonu
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2, yoyo: true })

        tl.to(['#left-door', '#right-door'], {
          x: (index) => (index === 0 ? -pulseDistance : pulseDistance),
          duration: 1,
          ease: 'power1.inOut',
        }).to(['#left-door', '#right-door'], {
          x: 0,
          duration: 1,
          ease: 'power1.inOut',
        })

        pulseTimelineRef.current = tl
      }
    },
    { scope: containerRef, dependencies: [isPulseActive, startAnimation] },
  )

  const handleHoverStart = () => {
    setIsPulseActive(false)

    if (pulseTimelineRef.current) {
      pulseTimelineRef.current.kill()

      // Kapıları orjinal pozisyona çek ve GSAP transform'unu temizle
      const leftDoor = document.querySelector('#left-door')
      const rightDoor = document.querySelector('#right-door')

      gsap.to([leftDoor, rightDoor], {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          // GSAP transform'unu tamamen temizle, CSS hover devralabilsin
          gsap.set([leftDoor, rightDoor], { clearProps: 'transform' })
        },
      })
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div
        ref={containerRef}
        className='aspect-[1440/1024] w-full border-offblack-950 border mx-16 relative overflow-hidden'
      >
        <section id='wall' className='absolute inset-0 '>
          <div className='relative w-full h-full'>
            <MainWall id='main-wall' className='z-10 absolute inset-0' />

            {/* Kapılar tam boyut ama peer sistemi ile */}
            <div
              className='absolute left-1/2 w-[10.5rem] -translate-x-1/2 h-60 bottom-10 peer z-20 flex justify-center opacity-5 cursor-pointer rounded-t-full'
              onMouseEnter={handleHoverStart}
            />

            <LeftDoor
              id='left-door'
              className='absolute inset-0 transition-all peer-hover:-translate-x-[5.2rem] duration-700'
            />

            <RightDoor
              id='right-door'
              className='absolute inset-0 transition-all peer-hover:translate-x-[5.2rem] duration-700'
            />
          </div>
        </section>

        <section id='room' className='ablosute inset-0 z-10 opacity-0'>
          <svg viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <Room id='room' />

            <RightVase id='right-vase' />

            <LeftVase id='left-vase' />

            <RightStar id='right-star' />

            <LeftStar id='left-star' />
          </svg>
        </section>
      </div>
    </div>
  )
}
