import { useEffect, useRef } from 'react'

import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'

interface UseRoomStepProps {
  onEnterTempleTimelineCreated?: (timeline: gsap.core.Timeline) => void
}

export const useRoomStep = ({ onEnterTempleTimelineCreated }: UseRoomStepProps) => {
  const { journeyStep, setJourneyStep, setIsGlowAnimationComplete, setShowExitButton } =
    useJourneyContext()
  const glowTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterTempleTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Auto-trigger glow animation when entering step 2
  useEffect(() => {
    if (journeyStep === 2) {
      const timer = setTimeout(() => {
        startGlowAnimation()
      }, 3000) // Wait for door animation to complete

      return () => clearTimeout(timer)
    }
  }, [journeyStep])

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
      })

    enterTempleTimelineRef.current = tl

    // Pass timeline reference to temple step for exit functionality
    if (onEnterTempleTimelineCreated) {
      onEnterTempleTimelineCreated(tl)
    }
  }

  const exitStep2 = () => {
    setShowExitButton(false)
    setIsGlowAnimationComplete(false)

    // Clean up glow animation
    if (glowTimelineRef.current) {
      glowTimelineRef.current.kill()
      glowTimelineRef.current = null
    }
  }

  return {
    startGlowAnimation,
    enterStep3,
    exitStep2,
  }
}
