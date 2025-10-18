'use client'

import LeftDoor from '@/components/society-events/leftDoor'
import LeftStar from '@/components/society-events/leftStar'
import LeftVase from '@/components/society-events/leftVase'
import MainWall from '@/components/society-events/mainWall'
import RightDoor from '@/components/society-events/rightDoor'
import RightStar from '@/components/society-events/rightStar'
import RightVase from '@/components/society-events/rightVase'
import Room from '@/components/society-events/room'

export default function SocietyEventsPage() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='aspect-[1440/1024] w-full border-offblack-950 border mx-16 relative overflow-hidden'>
        <section id='wall' className='absolute inset-0 '>
          <div className='relative w-full group '>
            <MainWall id='main-wall' className='z-10 absolute inset-0' />

            <LeftDoor
              id='left-door'
              className='absolute inset-0  transition-all group-hover:-translate-x-[5.2rem] duration-700'
            />

            <RightDoor
              id='right-door'
              className='absolute inset-0  group-hover:translate-x-[5.2rem] transition-all duration-700'
            />
          </div>
        </section>

        <section id='room' className='ablosute inset-0 z-10 opacity-0'>
          <svg viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <Room id='room' />

            <RightVase id='right-vase' />

            <LeftVase id='left-vase' />

            <RightStar id='right-star' />

            <LeftStar id='left-star' />
          </svg>
        </section>
      </div>
    </div>
  )
}
