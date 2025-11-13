'use client'

import { JourneyCards } from '@/components/journey/JourneyCards'
import { JourneyContainer } from '@/components/journey/JourneyContainer'
import { JourneyProvider } from '@/contexts/JourneyContext'
import { useJourneyNavigation } from '@/hooks/useJourneyNavigation'

function SocietyEventsContent() {
  const navigation = useJourneyNavigation()

  return (
    <div className='min-h-dvh flex justify-center items-center relative'>
      <JourneyCards cardsRef={navigation.cardsRef} />

      <JourneyContainer containerRef={navigation.containerRef} />
    </div>
  )
}

export default function SocietyEventsPage() {
  return (
    <JourneyProvider>
      <SocietyEventsContent />
    </JourneyProvider>
  )
}
