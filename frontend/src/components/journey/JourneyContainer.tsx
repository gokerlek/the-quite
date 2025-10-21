import React from 'react'

import Circle from '@/components/society-events/circle'
import { useContainerSize } from '@/hooks/useContainerSize'
import { useDoorAnimations } from '@/hooks/useDoorAnimations'

import { DoorSection } from './DoorSection'

interface JourneyContainerProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  journeyStep: number
  setJourneyStep: (step: number) => void
}

export const JourneyContainer = ({
  containerRef,
  journeyStep,
  setJourneyStep,
}: JourneyContainerProps) => {
  const { containerSize } = useContainerSize()
  const {
    showExitButton,
    handleHoverStart: onMouseEnter,
    handleDoorBellClick: onDoorClick,
    exitRoom: onExitRoom,
  } = useDoorAnimations({
    journeyStep: journeyStep,
    setJourneyStep: setJourneyStep,
    containerRef: containerRef,
  })

  return (
    <div
      ref={containerRef}
      style={{
        width: containerSize.width,
        height: containerSize.height,
        zIndex: journeyStep >= 1 ? 30 : 10,
      }}
      className='border-offblack-950 border relative overflow-hidden opacity-0'
    >
      <DoorSection onMouseEnter={onMouseEnter} onClick={onDoorClick} />

      <section id='room-cotainer' className='ablosute inset-0 z-10 opacity-0'>
        <svg viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <Circle id='room' />
        </svg>
      </section>

      {/* Step 3: House */}
      <section id='house-container' className='absolute inset-0 z-10 opacity-0'>
        {/* House content will be added here */}
      </section>

      {/* Step 4: Temple */}
      <section id='temple-container' className='absolute inset-0 z-10 opacity-0'>
        {/* Temple content will be added here */}
      </section>

      {/* Step 5: Postcard */}
      <section id='postcard-container' className='absolute inset-0 z-10 opacity-0'>
        {/* Postcard content will be added here */}
      </section>

      {/* Exit button outside room container for accessibility */}
      {showExitButton && (
        <button
          className='absolute bottom-10 right-1/2 bg-white text-black px-4 py-2 rounded z-50 transform translate-x-1/2'
          onClick={onExitRoom}
        >
          Exit Room
        </button>
      )}
    </div>
  )
}
