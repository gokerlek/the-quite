import { RefObject, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface UseDoorAnimationsProps {
  journeyStep: number
  setJourneyStep: (step: number) => void
  containerRef: RefObject<HTMLDivElement | null>
}

export const useDoorAnimations = ({
  journeyStep,
  setJourneyStep,
  containerRef,
}: UseDoorAnimationsProps) => {
  const [isPulseActive, setIsPulseActive] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)
  const [showExitButton, setShowExitButton] = useState(false)
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
    { scope: containerRef, dependencies: [isPulseActive, startAnimation, journeyStep] },
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

  const enterStep2 = () => {
    // Only allow clicking in Step 1 (when container is visible)
    if (journeyStep !== 1) return

    setIsPulseActive(false)
    setJourneyStep(2) // Enter room

    // Pulse timeline'ı durdur
    if (pulseTimelineRef.current) {
      pulseTimelineRef.current.kill()
    }

    // Room entry animasyonu - refined sequence
    const tl = gsap.timeline()

    // 1. Kapıları kaybet (fade out) ve door-bell'i disable et
    tl.to(['#left-door', '#right-door'], {
      opacity: 0,
      duration: 0,
      ease: 'power2.out',
      onComplete: () => {
        // CSS class'larını temizle
        const leftDoor = document.querySelector('#left-door')
        const rightDoor = document.querySelector('#right-door')

        if (leftDoor) leftDoor.setAttribute('class', 'absolute inset-0')

        if (rightDoor) rightDoor.setAttribute('class', 'absolute inset-0')
      },
    })
      .to(
        '#door-bell',
        {
          pointerEvents: 'none',
          opacity: 0,
          duration: 0,
          ease: 'power2.out',
        },
        '<',
      ) // Kapılarla aynı anda

      // 2. Wall zoom ve Room animasyonları aynı anda başlar
      // Room container başlangıç pozisyonu ayarla
      .set('#room-cotainer', {
        opacity: 0,
        scale: 0.5,
        y: '15%',
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
          duration: 1.8,
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

  const exitStep2 = () => {
    setShowExitButton(false)
    setJourneyStep(1) // Return to door

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
      })

      enterRoomTimelineRef.current.reverse()
    }
  }

  // Placeholder functions for future steps
  const enterStep3 = () => {
    setJourneyStep(3)
  }

  const enterStep4 = () => {
    setJourneyStep(4)
  }

  const enterStep5 = () => {
    setJourneyStep(5)
  }

  const exitStep3 = () => {
    setJourneyStep(1)
  }

  const exitStep4 = () => {
    setJourneyStep(1)
  }

  const exitStep5 = () => {
    setJourneyStep(1)
  }

  // Backward compatibility aliases
  const handleDoorBellClick = enterStep2
  const exitRoom = exitStep2

  return {
    isPulseActive,
    startAnimation,
    showExitButton,
    handleHoverStart,
    handleDoorBellClick,
    exitRoom,
    // New step-based functions
    enterStep2,
    enterStep3,
    enterStep4,
    enterStep5,
    exitStep2,
    exitStep3,
    exitStep4,
    exitStep5,
  }
}
