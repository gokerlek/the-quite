import { useRef } from 'react'

import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'

interface UseTempleStepProps {
  onEnterHouseTimelineCreated?: (timeline: gsap.core.Timeline) => void
}

export const useTempleStep = ({ onEnterHouseTimelineCreated }: UseTempleStepProps) => {
  const { journeyStep, setJourneyStep, setIsTempleAnimationComplete, setShowExitButton } =
    useJourneyContext()
  const templeCircleTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const templeStarTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterHouseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterTempleTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Temple circle animations are triggered by enterStep3, not automatically

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

    // Pass timeline reference to house step for exit functionality
    if (onEnterHouseTimelineCreated) {
      onEnterHouseTimelineCreated(tl)
    }
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
    setJourneyStep(3) // Return to temple

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

        // Set temple to final state (animations completed) - same as original
        setIsTempleAnimationComplete(true)
        setShowExitButton(true)

        // Ensure temple gate-star is in the loop animation state - same as original
        if (!templeStarTimelineRef.current) {
          startTempleStarAnimation()
        }
      })

      enterHouseTimelineRef.current.reverse()
    }
  }

  // Set enterTempleTimelineRef for exit functionality
  const setEnterTempleTimeline = (timeline: gsap.core.Timeline) => {
    enterTempleTimelineRef.current = timeline
  }

  return {
    startTempleCircleAnimations,
    startTempleStarAnimation,
    enterStep4,
    exitStep3,
    exitStep4,
    setEnterTempleTimeline,
  }
}
