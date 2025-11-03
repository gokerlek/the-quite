import { useEffect, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'

export const useJourneyNavigation = () => {
  const { journeyStep, setJourneyStep } = useJourneyContext()
  const cardsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Wheel event listener for journey navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault() // Prevent actual scrolling

      // Only handle wheel in steps 0 and 1
      if (journeyStep === 0 && e.deltaY > 0) {
        // Wheel down from cards to door
        setJourneyStep(1)
      } else if (journeyStep === 1 && e.deltaY < 0) {
        // Wheel up from door back to cards
        setJourneyStep(0)
      }
    }

    // Only add listener if in steps 0 or 1
    if (journeyStep === 0 || journeyStep === 1) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [journeyStep, setJourneyStep])

  // Journey step transition animations
  useGSAP(
    () => {
      if (cardsRef.current && containerRef.current) {
        const tl = gsap.timeline()

        if (journeyStep === 0) {
          // Sequential: first hide container completely, then show cards
          tl.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }).to(cardsRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power1.out',
          })
        } else if (journeyStep >= 1) {
          // Sequential: first hide cards completely, then show container
          tl.to(cardsRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }).to(containerRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power1.out',
          })
        }
      }
    },
    { dependencies: [journeyStep] },
  )

  return {
    cardsRef,
    containerRef,
  }
}
