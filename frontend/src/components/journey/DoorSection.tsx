import React from 'react'

import LeftDoor from '@/components/society-events/leftDoor'
import LeftDoorMobile from '@/components/society-events/leftDoorMobile'
import MainWall from '@/components/society-events/mainWall'
import MainWallMobile from '@/components/society-events/mainWallMobile'
import RightDoor from '@/components/society-events/rightDoor'
import RightDoorMobile from '@/components/society-events/rightDoorMobile'
import { useMobileDetection } from '@/hooks/useMobileDetection'

interface DoorSectionProps {
  onMouseEnter: () => void
  onClick: () => void
}

export const DoorSection = ({ onMouseEnter, onClick }: DoorSectionProps) => {
  const isMobile = useMobileDetection()

  return (
    <section id='door-section' className='absolute inset-0 z-20 '>
      <div id='wall' className='relative w-full h-full'>
        {isMobile ? (
          <MainWallMobile id='main-wall' className='z-10 absolute inset-0' />
        ) : (
          <MainWall id='main-wall' className='z-10 absolute inset-0' />
        )}

        {/* Kapılar tam boyut ama peer sistemi ile */}
        <div
          id='door-bell'
          className='absolute left-1/2 w-[10.5rem] -translate-x-1/2 h-60 bottom-10 peer z-20 flex justify-center opacity-5 cursor-pointer rounded-t-full'
          onMouseEnter={onMouseEnter}
          onClick={onClick}
        />

        {isMobile ? (
          <LeftDoorMobile
            id='left-door'
            className='absolute inset-0 transition-all peer-hover:-translate-x-[5.3rem] duration-700'
          />
        ) : (
          <LeftDoor
            id='left-door'
            className='absolute inset-0 transition-all peer-hover:-translate-x-[6.3rem] duration-700'
          />
        )}

        {isMobile ? (
          <RightDoorMobile
            id='right-door'
            className='absolute inset-0 transition-all peer-hover:translate-x-[5.3rem] duration-700'
          />
        ) : (
          <RightDoor
            id='right-door'
            className='absolute inset-0 transition-all peer-hover:translate-x-[6.3rem] duration-700'
          />
        )}
      </div>
    </section>
  )
}
