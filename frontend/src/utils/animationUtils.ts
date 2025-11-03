import gsap from 'gsap'

// Door configuration interface
export interface DoorConfig {
  leftSelector: string
  rightSelector: string
  targetStep: number
  pulseDistancePercent?: number
  duration?: number
  repeatDelay?: number
  ease?: string
}

// Default door pulse configuration
const defaultDoorConfig = {
  pulseDistancePercent: 0.15,
  duration: 1,
  repeatDelay: 2.2,
  ease: 'power1.inOut',
}

// Create door pulse animation
export const createDoorPulseAnimation = (config: DoorConfig): gsap.core.Timeline | null => {
  const { leftSelector, rightSelector, pulseDistancePercent, duration, repeatDelay, ease } = {
    ...defaultDoorConfig,
    ...config,
  }

  const leftDoor = document.querySelector(leftSelector) as SVGSVGElement

  if (!leftDoor) return null

  // Kapı genişliğini hesapla
  const doorWidth = leftDoor.getBoundingClientRect().width
  const pulseDistance = doorWidth * pulseDistancePercent

  // Loop aç-kapat animasyonu
  const tl = gsap.timeline({ repeat: -1, repeatDelay, yoyo: true })

  tl.to([leftSelector, rightSelector], {
    x: (index) => (index === 0 ? -pulseDistance : pulseDistance),
    duration,
    ease,
  }).to([leftSelector, rightSelector], {
    x: 0,
    duration,
    ease,
  })

  return tl
}

// Door hover handler
export const createDoorHoverHandler = (
  doorSelectors: string[],
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>,
  setPulseActive: (active: boolean) => void,
) => {
  return () => {
    setPulseActive(false)

    if (timelineRef.current) {
      timelineRef.current.kill()

      gsap.to(doorSelectors, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          // GSAP transform'unu tamamen temizle, CSS hover devralabilsin
          gsap.set(doorSelectors, { clearProps: 'transform' })
        },
      })
    }
  }
}

// Step transition configuration
export interface StepTransitionConfig {
  fromStep: number
  toStep: number
  fromContainerSelector: string
  toContainerSelector: string
  doorSelectors?: string[]
  doorBellSelector?: string
  scaleValue?: number
  yValue?: string
  duration?: number
  ease?: string
}

// Default step transition configuration
const defaultStepTransitionConfig = {
  scaleValue: 7.9,
  yValue: '-250%',
  duration: 2.5,
  ease: 'power2.inOut',
}

// Create step transition animation
export const createStepTransitionAnimation = (config: StepTransitionConfig): gsap.core.Timeline => {
  const {
    toContainerSelector,
    fromContainerSelector,
    doorSelectors,
    doorBellSelector,
    scaleValue,
    yValue,
    duration,
    ease,
  } = {
    ...defaultStepTransitionConfig,
    ...config,
  }

  const tl = gsap.timeline()

  // 1. Hide doors and doorbell if provided
  if (doorSelectors && doorSelectors.length > 0) {
    tl.to(doorSelectors, {
      opacity: 0,
      duration: 0,
      ease: 'power2.out',
      onComplete: () => {
        // Remove CSS classes
        doorSelectors.forEach((selector) => {
          const door = document.querySelector(selector)

          if (door) door.setAttribute('class', 'absolute inset-0')
        })
      },
    })
  }

  if (doorBellSelector) {
    tl.to(
      doorBellSelector,
      {
        pointerEvents: 'none',
        opacity: 0,
        duration: 0,
        ease: 'power2.out',
      },
      '<',
    )
  }

  // 2. Set initial state for target container
  tl.set(toContainerSelector, {
    opacity: 0,
    scale: 0.5,
    y: '15%',
  })

  // 3. Scale from container and fade in target
  tl.to(fromContainerSelector, {
    scale: scaleValue,
    y: yValue,
    duration,
    ease,
  })

  // 4. Fade in target container
  tl.to(
    toContainerSelector,
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    '<',
  )

  // 5. Position target container
  tl.to(
    toContainerSelector,
    {
      scale: 1,
      y: '0%',
      duration: 1.8,
      ease: 'power2.inOut',
    },
    '<',
  )

  return tl
}

// Timeline coordination utilities
export const createTimelineRefSetter = (
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>,
) => {
  return (timeline: gsap.core.Timeline) => {
    timelineRef.current = timeline
  }
}

export const setupTimelineCoordination = (
  timeline: gsap.core.Timeline,
  onTimelineCreated?: (timeline: gsap.core.Timeline) => void,
) => {
  if (onTimelineCreated) {
    onTimelineCreated(timeline)
  }

  return timeline
}
