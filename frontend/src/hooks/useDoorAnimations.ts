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
  const [isHousePulseActive, setIsHousePulseActive] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)
  const [houseStartAnimation, setHouseStartAnimation] = useState(false)
  const [showExitButton, setShowExitButton] = useState(false)
  const [isGlowAnimationComplete, setIsGlowAnimationComplete] = useState(false)
  const [isTempleAnimationComplete, setIsTempleAnimationComplete] = useState(false)
  const [isPostcardAnimationComplete, setIsPostcardAnimationComplete] = useState(false)
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const housePulseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const postcardTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterRoomTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterTempleTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterHouseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterPostcardTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const glowTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const templeCircleTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const templeStarTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Postcard animation configuration
  const postcardAnimationConfig = {
    startDelay: 2, // Transition sonrası 2s bekle
    fadeInDuration: 0.8, // Her postcard fade-in süresi
    staggerDelay: 0.3, // Postcard'lar arası gecikme
    ease: 'power2.out', // Easing function
  }

  // Postcard reset function
  const resetPostcardElements = () => {
    gsap.set(
      [
        '#postcard-1',
        '#postcard-2',
        '#postcard-3',
        '#postcard-4',
        '#postcard-5',
        '#postcard-6',
        '#postcard-7',
      ],
      {
        opacity: 0,
      },
    )
  }

  // Postcard timeline cleanup function
  const cleanupPostcardAnimation = () => {
    if (postcardTimelineRef.current) {
      postcardTimelineRef.current.kill()
      postcardTimelineRef.current = null
    }

    resetPostcardElements()
  }

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

  // Start a glow animation function
  const startGlowAnimation = () => {
    const centerCircle = document.querySelector('#center-circle')

    if (!centerCircle) return

    // Clean up any existing glow animation
    if (glowTimelineRef.current) {
      glowTimelineRef.current.kill()
    }

    const glowTl = gsap.timeline()

    glowTl
      // Initial state
      .set(centerCircle, {
        stroke: '#1C1C1C',
        filter: 'none',
        strokeWidth: 2,
      })
      // Glow effect (one time)
      .to(centerCircle, {
        stroke: '#F0002C',
        filter: 'drop-shadow(0 0 4px #FF0000)',
        strokeWidth: 1.5,
        duration: 2,
        ease: 'power2.out',
        delay: 1, // 1 saniye bekle
      })
      // Complete callback after the first glow
      .call(() => {
        setIsGlowAnimationComplete(true)
        setShowExitButton(true)
      })
      // Continue with a looping glow
      .to(centerCircle, {
        stroke: '#1C1C1C',
        filter: 'none',
        strokeWidth: 2,
        duration: 2,
        ease: 'power2.out',
        yoyo: true,
        repeat: -1,
      })

    glowTimelineRef.current = glowTl
  }

  // Start temple circle animations function
  const startTempleCircleAnimations = () => {
    // Clean up any existing animations
    if (templeCircleTimelineRef.current) {
      templeCircleTimelineRef.current.kill()
    }

    if (templeStarTimelineRef.current) {
      templeStarTimelineRef.current.kill()
    }

    // Set initial states
    gsap.set(['#temple-left-circle', '#temple-center-circle', '#temple-right-circle'], {
      opacity: 0,
      scale: 0.95,
      transformOrigin: 'center center',
    })

    gsap.set(
      ['#temple-left-circle-text', '#temple-center-circle-text', '#temple-right-circle-text'],
      {
        opacity: 0,
      },
    )

    gsap.set('#temple-gate-star', { transformOrigin: 'center center' })

    // Animation configuration
    const animationConfig = {
      circle: {
        fadeInDuration: 1,
        fadeOutDuration: 1,
        scaleIn: 1,
        scaleOut: 0.95,
        delay: 1,
        easeIn: 'elastic.out(1, 0.3)',
        easeOut: 'elastic.in(1, 0.3)',
      },
      text: {
        fadeInDuration: 1,
        fadeOutDuration: 1,
        delay: 0.5,
        ease: 'power2.out',
      },
    }

    // Sequential circle animation timeline
    const circleTl = gsap.timeline({
      onComplete: () => {
        // Start gate-star loop animation after circles complete
        startTempleStarAnimation()
      },
    })

    circleTl
      // 1 saniye bekle
      .delay(1)
      // 1. Left circle fade in
      .to('#temple-left-circle', {
        opacity: 1,
        scale: animationConfig.circle.scaleIn,
        duration: animationConfig.circle.fadeInDuration,
        ease: animationConfig.circle.easeIn,
      })
      // 2. Left text fades in
      .to(
        '#temple-left-circle-text',
        {
          opacity: 1,
          duration: animationConfig.text.fadeInDuration,
          ease: animationConfig.text.ease,
        },
        `+=${animationConfig.text.delay}`,
      )
      // 3. Left circle fade out
      .to(
        '#temple-left-circle',
        {
          opacity: 0,
          scale: animationConfig.circle.scaleOut,
          duration: animationConfig.circle.fadeOutDuration,
          ease: animationConfig.circle.easeOut,
        },
        `+=${animationConfig.circle.delay}`,
      )
      // 4. Center circle fade in
      .to(
        '#temple-center-circle',
        {
          opacity: 1,
          scale: animationConfig.circle.scaleIn,
          duration: animationConfig.circle.fadeInDuration,
          ease: animationConfig.circle.easeIn,
        },
        `+=${animationConfig.circle.delay}`,
      )
      // 5. Center text fade in
      .to(
        '#temple-center-circle-text',
        {
          opacity: 1,
          duration: animationConfig.text.fadeInDuration,
          ease: animationConfig.text.ease,
        },
        `+=${animationConfig.text.delay}`,
      )
      // 6. Center circle fade out
      .to(
        '#temple-center-circle',
        {
          opacity: 0,
          scale: animationConfig.circle.scaleOut,
          duration: animationConfig.circle.fadeOutDuration,
          ease: animationConfig.circle.easeOut,
        },
        `+=${animationConfig.circle.delay}`,
      )
      // 7. Right circle fade in
      .to(
        '#temple-right-circle',
        {
          opacity: 1,
          scale: animationConfig.circle.scaleIn,
          duration: animationConfig.circle.fadeInDuration,
          ease: animationConfig.circle.easeIn,
        },
        `+=${animationConfig.circle.delay}`,
      )
      // 8. Right text fade in
      .to(
        '#temple-right-circle-text',
        {
          opacity: 1,
          duration: animationConfig.text.fadeInDuration,
          ease: animationConfig.text.ease,
        },
        `+=${animationConfig.text.delay}`,
      )
      // 9. Right circle fade out
      .to(
        '#temple-right-circle',
        {
          opacity: 0,
          scale: animationConfig.circle.scaleOut,
          duration: animationConfig.circle.fadeOutDuration,
          ease: animationConfig.circle.easeOut,
        },
        `+=${animationConfig.circle.delay}`,
      )

    templeCircleTimelineRef.current = circleTl
  }

  // Start temple gate-star loop animation
  const startTempleStarAnimation = () => {
    const starTl = gsap.timeline({
      repeat: -1,
      onStart: () => {
        setIsTempleAnimationComplete(true)
        setShowExitButton(true)
      },
    })

    starTl.to('#temple-gate-star', {
      scale: 1.05,
      duration: 2.5,
      ease: 'elastic.out(1, 0.3)',
      yoyo: true,
      repeat: -1,
    })

    templeStarTimelineRef.current = starTl
  }

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

  const enterStep2 = () => {
    // Only allow clicking in Step 1 (when the container is visible)
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

      // Show the exit button and enable room interactions after animation completes
      .call(() => {
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

        // Start glow animation after enter animation completes
        startGlowAnimation()
      })

    enterRoomTimelineRef.current = tl
  }

  const exitStep2 = () => {
    setShowExitButton(false)
    setIsGlowAnimationComplete(false)
    setJourneyStep(1) // Return to the door

    // Clean up glow animation
    if (glowTimelineRef.current) {
      glowTimelineRef.current.kill()
      glowTimelineRef.current = null
    }

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

    setJourneyStep(3) // Enter a temple
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

      // Enable temple interactions and start circle animations after zoom completes
      .call(() => {
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

        // Start temple circle animations after zoom animation completes
        startTempleCircleAnimations()
      })

    enterTempleTimelineRef.current = tl
  }

  const enterStep4 = () => {
    // Only allow clicking in Step 3 (when a temple is visible)
    if (journeyStep !== 3) return

    setJourneyStep(4) // Enter house
    setShowExitButton(false) // Hide current exit button temporarily

    // House entry animation - following Step 2 pattern
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

      // Temple gate circle fade out
      .to(
        '#temple-gate-circle',
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=1.5',
      ) // Temple animasyonunun son 1 saniyesinde başlar

      // Show the exit button and enable house interactions after animation completes
      .call(() => {
        setShowExitButton(true)
        // Enable house interactions now that animation is complete
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

        // Start postcard sequential fade-in animation after delay
        setTimeout(() => {
          // Clean up any existing postcard animation
          cleanupPostcardAnimation()

          // Reset all postcards to hidden
          resetPostcardElements()

          // Create postcard sequential fade-in timeline
          const postcardTl = gsap.timeline({
            onComplete: () => {
              // Show the exit button only after all postcard animations complete
              setIsPostcardAnimationComplete(true)
              setShowExitButton(true)
            },
          })

          postcardTl
            .to('#postcard-1', {
              opacity: 1,
              duration: postcardAnimationConfig.fadeInDuration,
              ease: postcardAnimationConfig.ease,
            })
            .to(
              '#postcard-2',
              {
                opacity: 1,
                duration: postcardAnimationConfig.fadeInDuration,
                ease: postcardAnimationConfig.ease,
              },
              `+=${postcardAnimationConfig.staggerDelay}`,
            )
            .to(
              '#postcard-3',
              {
                opacity: 1,
                duration: postcardAnimationConfig.fadeInDuration,
                ease: postcardAnimationConfig.ease,
              },
              `+=${postcardAnimationConfig.staggerDelay}`,
            )
            .to(
              '#postcard-4',
              {
                opacity: 1,
                duration: postcardAnimationConfig.fadeInDuration,
                ease: postcardAnimationConfig.ease,
              },
              `+=${postcardAnimationConfig.staggerDelay}`,
            )
            .to(
              '#postcard-5',
              {
                opacity: 1,
                duration: postcardAnimationConfig.fadeInDuration,
                ease: postcardAnimationConfig.ease,
              },
              `+=${postcardAnimationConfig.staggerDelay}`,
            )
            .to(
              '#postcard-6',
              {
                opacity: 1,
                duration: postcardAnimationConfig.fadeInDuration,
                ease: postcardAnimationConfig.ease,
              },
              `+=${postcardAnimationConfig.staggerDelay}`,
            )
            .to(
              '#postcard-7',
              {
                opacity: 1,
                duration: postcardAnimationConfig.fadeInDuration,
                ease: postcardAnimationConfig.ease,
              },
              `+=${postcardAnimationConfig.staggerDelay}`,
            )

          postcardTimelineRef.current = postcardTl
        }, postcardAnimationConfig.startDelay * 1000) // Convert seconds to milliseconds
      })

    enterPostcardTimelineRef.current = tl
  }

  const exitStep3 = () => {
    setShowExitButton(false)
    setIsTempleAnimationComplete(false)
    setJourneyStep(2) // Return to room

    // Use GSAP reverse for temple exit
    if (enterTempleTimelineRef.current) {
      // Add onReverseComplete callback for restoration
      enterTempleTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Clean up temple animations AFTER reverse completes
        if (templeCircleTimelineRef.current) {
          templeCircleTimelineRef.current.kill()
          templeCircleTimelineRef.current = null
        }

        if (templeStarTimelineRef.current) {
          templeStarTimelineRef.current.kill()
          templeStarTimelineRef.current = null
        }

        // Reset all temple elements to the initially hidden state AFTER reverse
        gsap.set(['#temple-left-circle', '#temple-center-circle', '#temple-right-circle'], {
          opacity: 0,
          scale: 0.95,
          transformOrigin: 'center center',
        })

        gsap.set(
          ['#temple-left-circle-text', '#temple-center-circle-text', '#temple-right-circle-text'],
          {
            opacity: 0,
          },
        )

        gsap.set('#temple-gate-star', {
          scale: 1,
          transformOrigin: 'center center',
        })

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
    setJourneyStep(3) // Return to a temple

    // Use GSAP reverse for house exit - following Step 2 pattern
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

        // Set temple to final state (animations completed)
        setIsTempleAnimationComplete(true)
        setShowExitButton(true)

        // Ensure temple gate-star is in the loop animation state
        if (!templeStarTimelineRef.current) {
          startTempleStarAnimation()
        }
      })

      enterHouseTimelineRef.current.reverse()
    }
  }

  const exitStep5 = () => {
    setShowExitButton(false)
    setIsPostcardAnimationComplete(false)
    setJourneyStep(4) // Return to house

    // Use GSAP reverse for postcard exit
    if (enterPostcardTimelineRef.current) {
      // Add onReverseComplete callback for restoration
      enterPostcardTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Cleanup postcard animations AFTER reverse complete
        cleanupPostcardAnimation()

        // Hide all postcard elements after reverse animation completes
        gsap.set(
          [
            '#postcard-1',
            '#postcard-2',
            '#postcard-3',
            '#postcard-4',
            '#postcard-5',
            '#postcard-6',
            '#postcard-7',
          ],
          {
            opacity: 0,
          },
        )

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
    isGlowAnimationComplete,
    isTempleAnimationComplete,
    isPostcardAnimationComplete,
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

    isHousePulseActive,
    houseStartAnimation,
    houseMouseHoverStart,
  }
}
