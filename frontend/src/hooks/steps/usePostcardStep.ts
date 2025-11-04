import { useCallback, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import { useJourneyContext } from '@/contexts/JourneyContext'

export const usePostcardStep = () => {
  const { journeyStep, setShowExitButton } = useJourneyContext()
  const [isPostcardAnimationComplete, setIsPostcardAnimationComplete] = useState(false)
  const postcardTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const enterPostcardTimelineRef = useRef<gsap.core.Timeline | null>(null)

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
  const cleanupPostcardAnimation = useCallback(() => {
    if (postcardTimelineRef.current) {
      postcardTimelineRef.current.kill()
      postcardTimelineRef.current = null
    }

    resetPostcardElements()
  }, [])

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
  }, [
    cleanupPostcardAnimation,
    postcardAnimationConfig.ease,
    postcardAnimationConfig.fadeInDuration,
    postcardAnimationConfig.staggerDelay,
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
