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
  const [isEnteringRoom, setIsEnteringRoom] = useState(false)
  const [showExitButton, setShowExitButton] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterRoomTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Container boyutunu dinamik hesapla
  useEffect(() => {
    const calculateSize = () => {
      const { innerWidth: screenWidth, innerHeight: screenHeight } = window
      const svgRatio = 1440 / 1024
      const screenRatio = screenWidth / screenHeight

      if (screenRatio > svgRatio) {
        // Geniş ekran: yüksekliğe göre boyutlandır
        const height = screenHeight
        const width = height * svgRatio

        setContainerSize({ width, height })
      } else {
        // Uzun ekran: genişliğe göre boyutlandır
        const width = screenWidth
        const height = width / svgRatio

        setContainerSize({ width, height })
      }
    }

    calculateSize()
    window.addEventListener('resize', calculateSize)

    return () => window.removeEventListener('resize', calculateSize)
  }, [])

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

  const handleDoorBellClick = () => {
    setIsPulseActive(false)
    setIsEnteringRoom(true)

    // Pulse timeline'ı durdur
    if (pulseTimelineRef.current) {
      pulseTimelineRef.current.kill()
    }

    // Room entry animasyonu - refined sequence
    const tl = gsap.timeline()

    // 1. Kapıları kaybet (fade out)
    tl.to(['#left-door', '#right-door'], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        // CSS class'larını temizle
        const leftDoor = document.querySelector('#left-door')
        const rightDoor = document.querySelector('#right-door')

        if (leftDoor) leftDoor.className = 'absolute inset-0'

        if (rightDoor) rightDoor.className = 'absolute inset-0'
      },
    })

      // 2. Wall zoom ve Room animasyonları aynı anda başlar
      // Room container başlangıç pozisyonu ayarla
      .set('#room-cotainer', {
        opacity: 0,
        scale: 0.5,
        y: '25%',
      })

      // Wall section büyütme ve Room animasyonları aynı anda
      .to('#wall', {
        scale: 7.9,
        y: '-250%',
        duration: 2.5,
        ease: 'power2.inOut',
      })

      // Room opacity fade in (0.5s'de tamamlanır)
      .to(
        '#room-cotainer',
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '<',
      ) // Wall animasyonuyla aynı anda başlar

      // Room scale ve position
      .to(
        '#room-cotainer',
        {
          scale: 1,
          y: '0%',
          duration: 2.5,
          ease: 'power2.inOut',
        },
        '<',
      ) // Wall animasyonuyla aynı anda başlar

      // Show exit button after animation completes
      .call(() => {
        setShowExitButton(true)
      })

    enterRoomTimelineRef.current = tl
  }

  const exitRoom = () => {
    setIsEnteringRoom(false)
    setShowExitButton(false)

    // Use GSAP reverse - much simpler!
    if (enterRoomTimelineRef.current) {
      // Add onReverseComplete callback for CSS restoration
      enterRoomTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Restore door CSS classes for hover functionality
        const leftDoor = document.querySelector('#left-door')
        const rightDoor = document.querySelector('#right-door')

        if (leftDoor) {
          leftDoor.className =
            'absolute inset-0 transition-all peer-hover:-translate-x-[6.3rem] duration-700'
        }

        if (rightDoor) {
          rightDoor.className =
            'absolute inset-0 transition-all peer-hover:translate-x-[6.3rem] duration-700'
        }

        // Keep isPulseActive false - no auto pulse restart
      })

      enterRoomTimelineRef.current.reverse()
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div
        ref={containerRef}
        style={{
          width: containerSize.width,
          height: containerSize.height,
        }}
        className='border-offblack-950 border relative overflow-hidden'
      >
        <section id='wall' className='absolute inset-0 z-20 0'>
          <div className='relative w-full h-full'>
            <MainWall id='main-wall' className='z-10 absolute inset-0' />

            {/* Kapılar tam boyut ama peer sistemi ile */}
            <div
              id='door-bell'
              className='absolute left-1/2 w-[10.5rem] -translate-x-1/2 h-60 bottom-10 peer z-20 flex justify-center opacity-5 cursor-pointer rounded-t-full'
              onMouseEnter={handleHoverStart}
              onClick={handleDoorBellClick}
            />

            <LeftDoor
              id='left-door'
              className='absolute inset-0 transition-all peer-hover:-translate-x-[6.3rem] duration-700'
            />

            <RightDoor
              id='right-door'
              className='absolute inset-0 transition-all peer-hover:translate-x-[6.3rem] duration-700'
            />
          </div>
        </section>

        <section id='room-cotainer' className='ablosute inset-0 z-10 opacity-0'>
          <svg viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <Room id='room' />

            <RightVase id='right-vase' />

            <LeftVase id='left-vase' />

            <RightStar id='right-star' />

            <LeftStar id='left-star' />
          </svg>
        </section>

        {/* Exit button outside room container for accessibility */}
        {showExitButton && (
          <button
            className='absolute bottom-10 right-1/2 bg-white text-black px-4 py-2 rounded z-50 transform translate-x-1/2'
            onClick={exitRoom}
          >
            Exit Room
          </button>
        )}
      </div>
    </div>
  )
}
