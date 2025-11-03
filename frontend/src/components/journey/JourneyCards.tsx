import React from 'react'

import { OpeningDraggableCards } from '@/components/openingDraggableCards'
import { useJourneyContext } from '@/contexts/JourneyContext'

interface JourneyCardsProps {
  cardsRef: React.RefObject<HTMLDivElement | null>
}

export const JourneyCards = ({ cardsRef }: JourneyCardsProps) => {
  const { journeyStep } = useJourneyContext()

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
