import { RefObject } from 'react'

import { useJourneyContext } from '@/contexts/JourneyContext'

import { useDoorStep } from './steps/useDoorStep'
import { useHouseStep } from './steps/useHouseStep'
import { usePostcardStep } from './steps/usePostcardStep'
import { useRoomStep } from './steps/useRoomStep'
import { useTempleStep } from './steps/useTempleStep'

interface UseJourneyAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>
}

export const useJourneyAnimations = ({ containerRef }: UseJourneyAnimationsProps) => {
  const { journeyStep, showExitButton, isGlowAnimationComplete, isTempleAnimationComplete } =
    useJourneyContext()

  // Initialize all step hooks with timeline coordination
  const doorStep = useDoorStep({ containerRef })
  const postcardStep = usePostcardStep()
  const houseStep = useHouseStep({
    containerRef,
    onEnterPostcardTimelineCreated: (timeline) => postcardStep.setEnterPostcardTimeline(timeline),
  })
  const templeStep = useTempleStep({
    onEnterHouseTimelineCreated: (timeline) => houseStep.setEnterHouseTimeline(timeline),
  })
  const roomStep = useRoomStep({
    onEnterTempleTimelineCreated: (timeline) => templeStep.setEnterTempleTimeline(timeline),
  })

  // Enhanced room step with glow animation trigger
  const enhancedEnterStep2 = () => {
    doorStep.enterStep2()
  }

  // Enhanced temple step with circle animation trigger
  const enhancedEnterStep3 = () => {
    roomStep.enterStep3()
    // Start temple circle animations after room zoom completes
    setTimeout(() => {
      templeStep.startTempleCircleAnimations()
    }, 3000) // Wait for room zoom animation to complete
  }

  // Enhanced house step with postcard animation trigger
  const enhancedEnterStep5 = () => {
    houseStep.enterStep5()
  }

  // Exit function based on current step
  const exit = () => {
    switch (journeyStep) {
      case 2:
        roomStep.exitStep2()
        doorStep.exitStep2()
        break

      case 3:
        templeStep.exitStep3()
        break

      case 4:
        templeStep.exitStep4()
        break

      case 5:
        houseStep.exitStep5()
        break

      default:
        break
    }
  }

  return {
    // Door step
    isPulseActive: doorStep.isPulseActive,
    startAnimation: doorStep.startAnimation,
    handleHoverStart: doorStep.handleHoverStart,
    handleDoorBellClick: enhancedEnterStep2,

    // Room step
    enterStep3: enhancedEnterStep3,

    // Temple step
    enterStep4: templeStep.enterStep4,

    // House step
    isHousePulseActive: houseStep.isHousePulseActive,
    houseStartAnimation: houseStep.houseStartAnimation,
    houseMouseHoverStart: houseStep.houseMouseHoverStart,
    enterStep5: enhancedEnterStep5,

    // Postcard step
    isPostcardAnimationComplete: postcardStep.isPostcardAnimationComplete,

    // Global state from context
    showExitButton,
    isGlowAnimationComplete,
    isTempleAnimationComplete,

    // Navigation functions
    enterStep2: enhancedEnterStep2,
    exit,

    // Backward compatibility aliases
    exitStep2: () => exit(),
    exitStep3: () => exit(),
    exitStep4: () => exit(),
    exitStep5: () => exit(),
  }
}
