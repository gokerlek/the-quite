import { RefObject, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'
import {
  createDoorHoverHandler,
  createDoorPulseAnimation,
  createStepTransitionAnimation,
} from '@/utils/animationUtils'

interface UseDoorStepProps {
  containerRef: RefObject<HTMLDivElement | null>
}

export const useDoorStep = ({ containerRef }: UseDoorStepProps) => {
  const { journeyStep, setJourneyStep } = useJourneyContext()
  const [isPulseActive, setIsPulseActive] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterRoomTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Step 1'e geçince transition bitince 1 saniye sonra animasyonu başlat
  useEffect(() => {
    if (journeyStep === 1) {
      // Transition süresi (3s) + 1 saniye bekleme = 4 saniye
      const timer = setTimeout(() => {
        setStartAnimation(true)
      }, 4000)

      return () => clearTimeout(timer)
    } else {
      setStartAnimation(false)
    }
  }, [journeyStep])

  // Door pulse animation
  useGSAP(
    () => {
      if (!isPulseActive || !startAnimation || journeyStep !== 1) return

      const tl = createDoorPulseAnimation({
        leftSelector: '#left-door',
        rightSelector: '#right-door',
        targetStep: 1,
      })

      if (tl) {
        pulseTimelineRef.current = tl
      }
    },
    { scope: containerRef, dependencies: [isPulseActive, startAnimation, journeyStep] },
  )

  const handleHoverStart = createDoorHoverHandler(
    ['#left-door', '#right-door'],
    pulseTimelineRef,
    setIsPulseActive,
  )

  const enterStep2 = () => {
    // Only allow clicking in Step 1 (when the container is visible)
    if (journeyStep !== 1) return

    setIsPulseActive(false)
    setJourneyStep(2) // Enter room

    // Pulse timeline'ı durdur
    if (pulseTimelineRef.current) {
      pulseTimelineRef.current.kill()
    }

    // Use utility function for step transition
    const tl = createStepTransitionAnimation({
      fromStep: 1,
      toStep: 2,
      fromContainerSelector: '#wall',
      toContainerSelector: '#room-cotainer',
      doorSelectors: ['#left-door', '#right-door'],
      doorBellSelector: '#door-bell',
    })

    // Add completion callback
    tl.call(() => {
      // Enable room interactions now that animation is complete
      const roomContainer = document.querySelector('#room-cotainer')

      if (roomContainer) {
        gsap.set(roomContainer, { pointerEvents: 'auto' })
      }

      // Disable door interactions
      const doorSection = document.querySelector('#door-section')

      if (doorSection) {
        gsap.set(doorSection, { pointerEvents: 'none' })
      }
    })

    enterRoomTimelineRef.current = tl
  }

  const exitStep2 = () => {
    setJourneyStep(1) // Return to the door

    // Use GSAP reverse - much simpler!
    if (enterRoomTimelineRef.current) {
      // Add onReverseComplete callback for CSS restoration
      enterRoomTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Restore door CSS classes for hover functionality
        const leftDoor = document.querySelector('#left-door')
        const rightDoor = document.querySelector('#right-door')

        if (leftDoor) {
          leftDoor.setAttribute(
            'class',
            'absolute inset-0 transition-all peer-hover:-translate-x-[6.3rem] duration-700',
          )
        }

        if (rightDoor) {
          rightDoor.setAttribute(
            'class',
            'absolute inset-0 transition-all peer-hover:translate-x-[6.3rem] duration-700',
          )
        }

        // Keep isPulseActive false - no auto pulse restart

        // Enable door interactions now that reverse animation is complete
        const doorSection = document.querySelector('#door-section')

        if (doorSection) {
          gsap.set(doorSection, { pointerEvents: 'auto' })
        }

        // Disable room interactions
        const roomContainer = document.querySelector('#room-cotainer')

        if (roomContainer) {
          gsap.set(roomContainer, { pointerEvents: 'none' })
        }
      })

      enterRoomTimelineRef.current.reverse()
    }
  }

  return {
    isPulseActive,
    startAnimation,
    handleHoverStart,
    enterStep2,
    exitStep2,
    handleDoorBellClick: enterStep2, // Backward compatibility
  }
}
