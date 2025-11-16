import React from 'react'
import Image from 'next/image'

import { Circle } from '@/components/society-events/circle'
import { CircleMobile } from '@/components/society-events/circleMobile'
import { House } from '@/components/society-events/house'
import { LeftHouseDoor } from '@/components/society-events/leftHouseDoor'
import { LeftHouseDoorMobile } from '@/components/society-events/leftHouseDoorMobile'
import { Postcard } from '@/components/society-events/postcard'
import { PostcardMobile } from '@/components/society-events/postcardMobile'
import { RightHouseDoor } from '@/components/society-events/rightHouseDoor'
import { RightHouseDoorMobile } from '@/components/society-events/rightHouseDoorMobile'
import { Temple } from '@/components/society-events/temple'
import { TempleMobile } from '@/components/society-events/templeMobile'
import { Button } from '@/components/ui/button'
import { useJourneyContext } from '@/contexts/JourneyContext'
import { useContainerSize } from '@/hooks/useContainerSize'
import { useJourneyAnimations } from '@/hooks/useJourneyAnimations'
import { useMobileDetection } from '@/hooks/useMobileDetection'
import { cn } from '@/lib/utils'

import { DoorSection } from './DoorSection'

interface JourneyContainerProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export const JourneyContainer = ({ containerRef }: JourneyContainerProps) => {
  const isMobile = useMobileDetection()
  const { journeyStep } = useJourneyContext()
  const { containerSize } = useContainerSize()
  const {
    showExitButton,
    isGlowAnimationComplete,
    isTempleAnimationComplete,
    handleHoverStart: onMouseEnter,
    handleDoorBellClick: onDoorClick,
    houseMouseHoverStart,
    exit,
    enterStep3,
    enterStep4,
    enterStep5,
  } = useJourneyAnimations({
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
      className='border-offblack-950 border relative overflow-hidden opacity-0 h-dvh'
    >
      <DoorSection onMouseEnter={onMouseEnter} onClick={onDoorClick} />

      <section id='room-cotainer' className='absolute inset-0 z-10 opacity-0 pointer-events-none'>
        {isMobile ? <CircleMobile id='room' /> : <Circle id='room' />}

        <div
          id='circle-door-bell'
          className={cn(
            'fixed left-1/2 size-24 md:size-80 -translate-x-1/2 bottom-[46%] translate-y-1/2 md:bottom-[14%] md:-translate-y-1/2 z-50 rounded-full',
            {
              'cursor-pointer': isGlowAnimationComplete,
              'cursor-not-allowed': !isGlowAnimationComplete,
            },
          )}
          onClick={isGlowAnimationComplete ? enterStep3 : undefined}
        />
      </section>

      {/* Step 3: House */}
      <section
        id='temple-container'
        className='absolute inset-0 z-[9] opacity-0 pointer-events-none'
      >
        {isMobile ? <TempleMobile id='house' /> : <Temple id='house' />}

        <div
          id='temple-door-bell'
          className={`fixed left-1/2 size-40 md:size-80 -translate-x-1/2 bottom-[14%] -translate-y-1/2 z-50 rounded-full bg--400 ${
            isTempleAnimationComplete ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={isTempleAnimationComplete ? enterStep4 : undefined}
        />

        {/* House content will be added here */}
      </section>

      {/* Step 4: Temple */}
      <section
        id='house-container'
        className='absolute inset-0 z-[8] opacity-0 pointer-events-none'
      >
        {isMobile ? (
          <div id='house-wall' className='relative w-full h-full'></div>
        ) : (
          <div id='house-wall' className='relative w-full h-full'>
            <House id='house' />

            <div
              id='house-door-bell'
              className='absolute left-1/2 w-[11.5rem] -translate-x-1/2 h-80 bottom-[39%] peer z-50 flex justify-center cursor-pointer rounded-t-full'
              onMouseEnter={houseMouseHoverStart}
              onClick={enterStep5}
            />

            {isMobile ? (
              <LeftHouseDoorMobile
                id='house-left-door'
                className='absolute inset-0 transition-all peer-hover:-translate-x-[6.3rem] duration-700 '
              />
            ) : (
              <LeftHouseDoor
                id='house-left-door'
                className='absolute inset-0 transition-all peer-hover:-translate-x-[6.3rem] duration-700 '
              />
            )}

            {isMobile ? (
              <RightHouseDoorMobile
                id='house-right-door'
                className='absolute inset-0 transition-all peer-hover:translate-x-[6.3rem] duration-700'
              />
            ) : (
              <RightHouseDoor
                id='house-right-door'
                className='absolute inset-0 transition-all peer-hover:translate-x-[6.3rem] duration-700'
              />
            )}
          </div>
        )}
      </section>

      {/* Step 5: Postcard */}
      <section
        id='postcard-container'
        className='absolute inset-0 z-[7] opacity-0 pointer-events-none'
      >
        <svg
          viewBox='0 0 1440 1024'
          fill='none'
          className='relative'
          xmlns='http://www.w3.org/2000/svg'
        >
          {isMobile ? <PostcardMobile id='postcard' /> : <Postcard id='postcard' />}
        </svg>
      </section>

      {/* Exit button outside room container for accessibility */}
      {showExitButton && (
        <Button
          id='exit-button'
          variant='outline'
          onClick={exit}
          className=' z-50 absolute top-6 right-12 px-0 w-12 h-12 bg-offblack-50'
        >
          <div className='relative h-9 w-9'>
            <Image src='/events/left.svg' alt='left' fill className='object-cover' />
          </div>
        </Button>
      )}
    </div>
  )
}
