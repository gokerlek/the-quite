'use client'

import { JourneyCards } from '@/components/journey/JourneyCards'
import { JourneyContainer } from '@/components/journey/JourneyContainer'
import { useJourneyNavigation } from '@/hooks/useJourneyNavigation'

export default function SocietyEventsPage() {
  const navigation = useJourneyNavigation()

  return (
    <div className='min-h-screen flex justify-center items-center relative'>
      <JourneyCards cardsRef={navigation.cardsRef} journeyStep={navigation.journeyStep} />

      <JourneyContainer {...navigation} />
    </div>
  )
}
