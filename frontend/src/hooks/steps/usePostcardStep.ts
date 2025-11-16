import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'
import { useMobileDetection } from '@/hooks/useMobileDetection'

export const usePostcardStep = () => {
  const { journeyStep, setShowExitButton } = useJourneyContext()
  const isMobile = useMobileDetection()
  const [isPostcardAnimationComplete, setIsPostcardAnimationComplete] = useState(false)
  const postcardTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterPostcardTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Dynamic postcard elements based on mobile/desktop
  const postcardElements = useMemo(
    () =>
      isMobile
        ? ['#postcard-1', '#postcard-2', '#postcard-3', '#postcard-4', '#postcard-5']
        : [
            '#postcard-1',
            '#postcard-2',
            '#postcard-3',
            '#postcard-4',
            '#postcard-5',
            '#postcard-6',
            '#postcard-7',
          ],
    [isMobile],
  )

  // Postcard animation configuration
  const postcardAnimationConfig = {
    startDelay: 2, // Transition sonrası 2s bekle
    fadeInDuration: 0.8, // Her postcard fade-in süresi
    staggerDelay: 0.3, // Postcard'lar arası gecikme
    ease: 'power2.out', // Easing function
  }

  // Postcard reset function
  const resetPostcardElements = useCallback(() => {
    gsap.set(postcardElements, {
      opacity: 0,
    })
  }, [postcardElements])

  // Postcard timeline cleanup function
  const cleanupPostcardAnimation = useCallback(() => {
    if (postcardTimelineRef.current) {
      postcardTimelineRef.current.kill()
      postcardTimelineRef.current = null
    }

    resetPostcardElements()
  }, [resetPostcardElements])

  // Start postcard sequential fade-in animation
  const startPostcardAnimations = useCallback(() => {
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

    // Dynamic postcard animations based on available elements
    postcardElements.forEach((postcard, index) => {
      if (index === 0) {
        postcardTl.to(postcard, {
          opacity: 1,
          duration: postcardAnimationConfig.fadeInDuration,
          ease: postcardAnimationConfig.ease,
        })
      } else {
        postcardTl.to(
          postcard,
          {
            opacity: 1,
            duration: postcardAnimationConfig.fadeInDuration,
            ease: postcardAnimationConfig.ease,
          },
          `+=${postcardAnimationConfig.staggerDelay}`,
        )
      }
    })

    postcardTimelineRef.current = postcardTl
  }, [
    cleanupPostcardAnimation,
    postcardAnimationConfig.ease,
    postcardAnimationConfig.fadeInDuration,
    postcardAnimationConfig.staggerDelay,
    postcardElements,
    resetPostcardElements,
    setShowExitButton,
  ])

  const exitStep5 = () => {
    setIsPostcardAnimationComplete(false)

    // Use GSAP reverse for postcard exit
    if (enterPostcardTimelineRef.current) {
      // Add onReverseComplete callback for restoration
      enterPostcardTimelineRef.current.eventCallback('onReverseComplete', () => {
        // Cleanup postcard animations AFTER reverse completes
        cleanupPostcardAnimation()

        // Hide all postcard elements after reverse animation completes
        gsap.set(postcardElements, {
          opacity: 0,
        })
      })

      enterPostcardTimelineRef.current.reverse()
    }
  }

  // Auto-trigger postcard animations when entering step 5
  useEffect(() => {
    if (journeyStep === 5) {
      const timer = setTimeout(() => {
        startPostcardAnimations()
      }, postcardAnimationConfig.startDelay * 1000) // Use the existing delay config

      return () => clearTimeout(timer)
    }
  }, [journeyStep, postcardAnimationConfig.startDelay, startPostcardAnimations])

  // Set enterPostcardTimelineRef for exit functionality
  const setEnterPostcardTimeline = (timeline: gsap.core.Timeline) => {
    enterPostcardTimelineRef.current = timeline
  }

  return {
    isPostcardAnimationComplete,
    startPostcardAnimations,
    cleanupPostcardAnimation,
    resetPostcardElements,
    exitStep5,
    postcardAnimationConfig,
    setEnterPostcardTimeline,
  }
}
