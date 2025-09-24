'use client'

import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import { handleWheel } from '@/utils/handleWheel'

export type WordChangeDirection = 'up' | 'down'

interface UseWordChangeAnimationOptions {
  words: string[]
  scrollThreshold?: number
  autoPlay?: boolean
  autoPlayInterval?: number
}

interface UseWordChangeAnimationReturn {
  currentIndex: number
  containerRef: RefObject<HTMLDivElement | null>
  currentWordRef: RefObject<HTMLSpanElement | null>
  nextWordRef: RefObject<HTMLSpanElement | null>
  hasCompletedCycle: boolean
}

export function useWordChangeAnimation({
  words,
  scrollThreshold = 100,
  autoPlay = false,
  autoPlayInterval = 2000,
}: UseWordChangeAnimationOptions): UseWordChangeAnimationReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const currentWordRef = useRef<HTMLSpanElement>(null)
  const nextWordRef = useRef<HTMLSpanElement>(null)

  const scrollAccumulator = useRef(0)

  const animateWordChange = useCallback(
    (newIndex: number, direction: WordChangeDirection) => {
      if (isAnimating || !currentWordRef.current || !nextWordRef.current || !containerRef.current)
        return

      setIsAnimating(true)
      const nextWord = words[newIndex]
      const currentY = direction === 'up' ? -100 : 100
      const nextY = direction === 'up' ? 100 : -100

      // 1. Update next word text
      nextWordRef.current.textContent = nextWord

      // 2. Place next word off-screen and scaled down
      gsap.set(nextWordRef.current, { yPercent: nextY, opacity: 0, scale: 0.5 })

      // 3. Wait a frame for layout and measure width
      requestAnimationFrame(() => {
        const newWidth = nextWordRef.current?.getBoundingClientRect().width || 0

        // 4. Run animation
        gsap
          .timeline({
            onComplete: () => {
              const temp = currentWordRef.current

              currentWordRef.current = nextWordRef.current
              nextWordRef.current = temp
              setCurrentIndex(newIndex)
              setIsAnimating(false)
            },
          })
          .to(currentWordRef.current, {
            yPercent: currentY,
            opacity: 0,
            scale: 0.1,
            duration: 0.8,
            ease: 'power2.inOut',
          })
          .to(
            containerRef.current,
            {
              width: newWidth * 2,
              duration: 0.8,
              ease: 'power2.inOut',
            },
            '<',
          )
          .to(
            nextWordRef.current,
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power2.inOut',
            },
            '<',
          )
      })
    },
    [isAnimating, words],
  )

  // Auto play effect for mobile
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentIndex + 1) % words.length

        // İlk turunu tamamladığını işaretle
        if (currentIndex === words.length - 1 && !hasCompletedCycle) {
          setHasCompletedCycle(true)
        }

        animateWordChange(nextIndex, 'down')
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [
    autoPlay,
    autoPlayInterval,
    currentIndex,
    isAnimating,
    words.length,
    animateWordChange,
    hasCompletedCycle,
  ])

  // Wheel event for desktop
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      handleWheel(e, {
        currentIndex,
        wordsLength: words.length,
        isAnimating,
        animateWordChange: (newIndex, direction) => {
          animateWordChange(newIndex, direction)
        },
        scrollAccumulator,
        scrollThreshold,
      })
    }

    window.addEventListener('wheel', handler, { passive: false })

    return () => {
      window.removeEventListener('wheel', handler)
    }
  }, [currentIndex, isAnimating, words.length, scrollThreshold, animateWordChange])

  return {
    currentIndex,
    containerRef,
    currentWordRef,
    nextWordRef,
    hasCompletedCycle,
  }
}
