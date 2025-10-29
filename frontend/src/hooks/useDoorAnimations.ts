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
  const enterTempleTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterHouseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterPostcardTimelineRef = useRef<gsap.core.Timeline | null>(null)

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

      // Show exit button and enable room interactions after animation completes
      .call(() => {
        setShowExitButton(true)
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

  const enterStep3 = () => {
    // Only allow clicking in Step 2 (when room is visible)
    if (journeyStep !== 2) return

    setJourneyStep(3) // Enter temple
    setShowExitButton(false) // Hide current exit button temporarily

    // Temple entry animation
    const tl = gsap.timeline()

    // Temple container başlangıç pozisyonu ayarla
    tl.set('#temple-container', {
      opacity: 0,
      scale: 0.8,
      y: '15%',
    })

      // Room büyütme animasyonu (12 kat)
      .to('#room-cotainer', {
        scale: 15,
        duration: 2.5,
        ease: 'power2.inOut',
      })

      // Temple fade-in
      .to(
        '#temple-container',
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '<', // Room animasyonuyla aynı anda başlar
      )

      // Temple positioning
      .to(
        '#temple-container',
        {
          scale: 1,
          y: '0%',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        '<', // Room animasyonuyla aynı anda başlar
      )
      // Lines-group fade out animasyonu (son 1 saniyede)
      .to(
        '#lines-group',
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=1.5',
      ) // Room animasyonunun son 1 saniyesinde başlar

      // Show exit button and enable temple interactions after animation completes
      .call(() => {
        setShowExitButton(true)
        // Enable temple interactions
        const templeContainer = document.querySelector('#temple-container')

        if (templeContainer) {
          gsap.set(templeContainer, { pointerEvents: 'auto' })
        }

        // Disable room interactions
        const roomContainer = document.querySelector('#room-cotainer')

        if (roomContainer) {
          gsap.set(roomContainer, { pointerEvents: 'none' })
        }
      })

    enterTempleTimelineRef.current = tl
  }

  const enterStep4 = () => {
    // Only allow clicking in Step 3 (when temple is visible)
    if (journeyStep !== 3) return

    setJourneyStep(4) // Enter house
    setShowExitButton(false) // Hide current exit button temporarily

    // House entry animation
    const tl = gsap.timeline()

    // House container başlangıç pozisyonu ayarla
    tl.set('#house-container', {
      opacity: 0,
      scale: 0.8,
      y: '15%',
    })

      // Temple büyütme animasyonu (12 kat)
      .to('#temple-container', {
        scale: 15,
        y: '-50%',
        duration: 2.5,
        ease: 'power2.inOut',
        transformOrigin: 'center center',
      })

      // House fade-in
      .to(
        '#house-container',
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '<', // Temple animasyonuyla aynı anda başlar
      )

      // House positioning
      .to(
        '#house-container',
        {
          scale: 1,
          y: '0%',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        '<', // Temple animasyonuyla aynı anda başlar
      )
      //
      .to(
        '#temple-gate-circle',
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=1.5',
      ) // Temple animasyonunun son 1 saniyesinde başlar

      // Show exit button and enable house interactions after animation completes
      .call(() => {
        setShowExitButton(true)
        // Enable house interactions
        const houseContainer = document.querySelector('#house-container')

        if (houseContainer) {
          gsap.set(houseContainer, { pointerEvents: 'auto' })
        }

        // Disable temple interactions
        const templeContainer = document.querySelector('#temple-container')

        if (templeContainer) {
          gsap.set(templeContainer, { pointerEvents: 'none' })
        }
      })

    enterHouseTimelineRef.current = tl
  }

  const enterStep5 = () => {
    // Only allow clicking in Step 4 (when house is visible)
    if (journeyStep !== 4) return

    setJourneyStep(5) // Enter postcard
    setShowExitButton(false) // Hide current exit button temporarily

    // Postcard entry animation
    const tl = gsap.timeline()

    // Postcard container başlangıç pozisyonu ayarla
    tl.set('#postcard-container', {
      opacity: 0,
      scale: 0.8,
      y: '15%',
    })

      // House büyütme animasyonu (12 kat)
      .to('#house-container', {
        scale: 12,
        y: '-250%',
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

      // Show exit button and enable postcard interactions after animation completes
      .call(() => {
        setShowExitButton(true)
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
  }

  const exitStep3 = () => {
    setShowExitButton(false)
    setJourneyStep(2) // Return to room

    // Use GSAP reverse for temple exit
    if (enterTempleTimelineRef.current) {
      // Add onReverseComplete callback for restoration
      enterTempleTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Enable room interactions now that reverse animation is complete
        const roomContainer = document.querySelector('#room-cotainer')

        if (roomContainer) {
          gsap.set(roomContainer, { pointerEvents: 'auto' })
        }

        // Disable temple interactions
        const templeContainer = document.querySelector('#temple-container')

        if (templeContainer) {
          gsap.set(templeContainer, { pointerEvents: 'none' })
        }

        setShowExitButton(true)
      })

      enterTempleTimelineRef.current.reverse()
    }
  }

  const exitStep4 = () => {
    setShowExitButton(false)
    setJourneyStep(3) // Return to temple

    // Use GSAP reverse for house exit
    if (enterHouseTimelineRef.current) {
      // Add onReverseComplete callback for restoration
      enterHouseTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Enable temple interactions now that reverse animation is complete
        const templeContainer = document.querySelector('#temple-container')

        if (templeContainer) {
          gsap.set(templeContainer, { pointerEvents: 'auto' })
        }

        // Disable house interactions
        const houseContainer = document.querySelector('#house-container')

        if (houseContainer) {
          gsap.set(houseContainer, { pointerEvents: 'none' })
        }

        setShowExitButton(true)
      })

      enterHouseTimelineRef.current.reverse()
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

        setShowExitButton(true)
      })

      enterPostcardTimelineRef.current.reverse()
    }
  }

  // Backward compatibility aliases
  const handleDoorBellClick = enterStep2
  const exit =
    journeyStep === 2
      ? exitStep2
      : journeyStep === 3
        ? exitStep3
        : journeyStep === 4
          ? exitStep4
          : journeyStep === 5
            ? exitStep5
            : () => {}

  return {
    isPulseActive,
    startAnimation,
    showExitButton,
    handleHoverStart,
    handleDoorBellClick,
    exit,
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
