import { RefObject, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'
import {
  createDoorHoverHandler,
  createDoorPulseAnimation,
  createStepTransitionAnimation,
} from '@/utils/animationUtils'

interface UseHouseStepProps {
  containerRef: RefObject<HTMLDivElement | null>
  onEnterPostcardTimelineCreated?: (timeline: gsap.core.Timeline) => void
}

export const useHouseStep = ({
  containerRef,
  onEnterPostcardTimelineCreated,
}: UseHouseStepProps) => {
  const { journeyStep, setJourneyStep, setShowExitButton } = useJourneyContext()
  const [isHousePulseActive, setIsHousePulseActive] = useState(true)
  const [houseStartAnimation, setHouseStartAnimation] = useState(false)
  const housePulseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterPostcardTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterHouseTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Step 4'e geçince transition bitince 1 saniye sonra house pulse animasyonunu başlat
  useEffect(() => {
    if (journeyStep === 4) {
      // Transition süresi (3s) + 1 saniye bekleme = 4 saniye
      const timer = setTimeout(() => {
        setHouseStartAnimation(true)
        setIsHousePulseActive(true)
      }, 4000)

      return () => clearTimeout(timer)
    } else {
      setHouseStartAnimation(false)
      setIsHousePulseActive(false)
    }
  }, [journeyStep])

  // House door pulse animation
  useGSAP(
    () => {
      if (!isHousePulseActive || !houseStartAnimation || journeyStep !== 4) return

      const tl = createDoorPulseAnimation({
        leftSelector: '#house-left-door',
        rightSelector: '#house-right-door',
        targetStep: 4,
      })

      if (tl) {
        housePulseTimelineRef.current = tl
      }
    },
    { scope: containerRef, dependencies: [isHousePulseActive, houseStartAnimation, journeyStep] },
  )

  const houseMouseHoverStart = createDoorHoverHandler(
    ['#house-left-door', '#house-right-door'],
    housePulseTimelineRef,
    setIsHousePulseActive,
  )

  const enterStep5 = () => {
    // Only allow clicking in Step 4 (when a house is visible)
    if (journeyStep !== 4) return

    setJourneyStep(5) // Enter postcard
    setShowExitButton(false) // Hide current exit button temporarily

    // Use utility function for step transition
    const tl = createStepTransitionAnimation({
      fromStep: 4,
      toStep: 5,
      fromContainerSelector: '#house-container',
      toContainerSelector: '#postcard-container',
      doorSelectors: ['#house-left-door', '#house-right-door'],
      doorBellSelector: '#house-door-bell',
      scaleValue: 12,
      yValue: '-50%',
    })

    // Add completion callback
    tl.call(() => {
      // Enable postcard interactions
      const postcardContainer = document.querySelector('#postcard-container')

      if (postcardContainer) {
        gsap.set(postcardContainer, { pointerEvents: 'auto' })
      }

      // Disable house interactions
      const houseContainer = document.querySelector('#house-container')

      if (houseContainer) {
        gsap.set(houseContainer, { pointerEvents: 'none' })
      }
    })

    enterPostcardTimelineRef.current = tl

    // Pass timeline reference for exit functionality
    if (onEnterPostcardTimelineCreated) {
      onEnterPostcardTimelineCreated(tl)
    }
  }

  const exitStep5 = () => {
    setShowExitButton(false)
    setJourneyStep(4) // Return to house

    // Use GSAP reverse for postcard exit
    if (enterPostcardTimelineRef.current) {
      // Add onReverseComplete callback for restoration
      enterPostcardTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Enable house interactions now that reverse animation is complete
        const houseContainer = document.querySelector('#house-container')

        if (houseContainer) {
          gsap.set(houseContainer, { pointerEvents: 'auto' })
        }

        // Disable postcard interactions
        const postcardContainer = document.querySelector('#postcard-container')

        if (postcardContainer) {
          gsap.set(postcardContainer, { pointerEvents: 'none' })
        }

        // Return to the house in final state (with the exit button)
        setShowExitButton(true)
      })

      enterPostcardTimelineRef.current.reverse()
    }
  }

  // Set enterHouseTimelineRef for exit functionality
  const setEnterHouseTimeline = (timeline: gsap.core.Timeline) => {
    enterHouseTimelineRef.current = timeline
  }

  return {
    isHousePulseActive,
    houseStartAnimation,
    houseMouseHoverStart,
    enterStep5,
    exitStep5,
    setEnterHouseTimeline,
  }
}
