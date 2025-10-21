import React from 'react'

import { OpeningDraggableCards } from '@/components/openingDraggableCards'

interface JourneyCardsProps {
  cardsRef: React.RefObject<HTMLDivElement | null>
  journeyStep: number
}

export const JourneyCards = ({ cardsRef, journeyStep }: JourneyCardsProps) => {
  return (
    <div
      ref={cardsRef}
      className='absolute inset-0'
      style={{ zIndex: journeyStep === 0 ? 30 : 10 }}
    >
      <OpeningDraggableCards />
    </div>
  )
}
