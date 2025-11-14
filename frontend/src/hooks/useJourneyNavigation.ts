import { useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'
import { useMobileDetection } from '@/hooks/useMobileDetection'

export const useJourneyNavigation = () => {
  const { journeyStep, setJourneyStep } = useJourneyContext()
  const cardsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()
  const [touchStartY, setTouchStartY] = useState(0)

  // Navigation event listeners (wheel for desktop, touch for mobile)
  useEffect(() => {
    // Touch event handlers for mobile navigation
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault() // Prevent actual scrolling
      const touchEndY = e.touches[0].clientY
      const deltaY = touchStartY - touchEndY
      const threshold = 50 // Minimum swipe distance

      // Only handle touch in steps 0 and 1
      if (journeyStep === 0 && deltaY > threshold) {
        // Swipe up from cards to door
        setJourneyStep(1)
      } else if (journeyStep === 1 && deltaY < -threshold) {
        // Swipe down from door back to cards
        setJourneyStep(0)
      }
    }
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

    // Only add listeners if in steps 0 or 1
    if (journeyStep === 0 || journeyStep === 1) {
      if (isMobile) {
        // Mobile: Add touch event listeners
        window.addEventListener('touchstart', handleTouchStart, { passive: false })
        window.addEventListener('touchmove', handleTouchMove, { passive: false })
      } else {
        // Desktop: Add wheel event listener
        window.addEventListener('wheel', handleWheel, { passive: false })
      }
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
      } else {
        window.removeEventListener('wheel', handleWheel)
      }
    }
  }, [journeyStep, setJourneyStep, isMobile, touchStartY])

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
