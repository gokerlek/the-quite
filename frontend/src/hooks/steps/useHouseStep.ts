import { RefObject, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'

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

      const leftDoor = document.querySelector('#house-left-door') as SVGSVGElement

      if (leftDoor) {
        // Kapı genişliğini hesapla
        const doorWidth = leftDoor.getBoundingClientRect().width
        const pulseDistance = doorWidth * 0.15 // %15'lik hareket
        // Loop aç-kapat animasyonu
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2, yoyo: true })

        tl.to(['#house-left-door', '#house-right-door'], {
          x: (index) => (index === 0 ? -pulseDistance : pulseDistance),
          duration: 1,
          ease: 'power1.inOut',
        }).to(['#house-left-door', '#house-right-door'], {
          x: 0,
          duration: 1,
          ease: 'power1.inOut',
        })

        housePulseTimelineRef.current = tl
      }
    },
    { scope: containerRef, dependencies: [isHousePulseActive, houseStartAnimation, journeyStep] },
  )

  const houseMouseHoverStart = () => {
    setIsHousePulseActive(false)

    if (housePulseTimelineRef.current) {
      housePulseTimelineRef.current.kill()

      // Kapıları orjinal pozisyona çek ve GSAP transform'unu temizle
      const leftDoor = document.querySelector('#house-left-door')
      const rightDoor = document.querySelector('#house-right-door')

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

  const enterStep5 = () => {
    // Only allow clicking in Step 4 (when a house is visible)
    console.log('enterStep5')

    if (journeyStep !== 4) return

    setJourneyStep(5) // Enter postcard
    setShowExitButton(false) // Hide current exit button temporarily

    // Postcard entry animation - following Step 2 pattern
    const tl = gsap.timeline()

    // 1. Hide house doors and doorbell first (like Step 2 does)
    tl.to(['#house-left-door', '#house-right-door'], {
      opacity: 0,
      duration: 0,
      ease: 'power2.out',
    })
      .to(
        '#house-door-bell',
        {
          pointerEvents: 'none',
          opacity: 0,
          duration: 0,
          ease: 'power2.out',
        },
        '<',
      ) // House doorbell ile aynı anda

      // Postcard container başlangıç pozisyonu ayarla
      .set('#postcard-container', {
        opacity: 0,
        scale: 0.8,
        y: '15%',
      })

      // House büyütme animation (12 kat)
      .to('#house-container', {
        scale: 12,
        y: '-50%',
        duration: 2.5,
        ease: 'power2.inOut',
      })

      // Postcard fade-in
      .to(
        '#postcard-container',
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '<', // House animasyonuyla aynı anda başlar
      )

      // Postcard positioning
      .to(
        '#postcard-container',
        {
          scale: 1,
          y: '0%',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        '<', // House animasyonuyla aynı anda başlar
      )

      // Enable postcard interactions after zoom animation completes (no exit button yet)
      .call(() => {
        // Enable postcard interactions
        const postcardContainer = document.querySelector('#postcard-container')

        if (postcardContainer) {
          gsap.set(postcardContainer, { pointerEvents: 'auto' })
        }

        // Disable house interactions - following Step 2 pattern
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
