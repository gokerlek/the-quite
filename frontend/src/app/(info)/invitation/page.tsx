'use client'

import Event from '@/components/events/event'
import { PreviousEvents } from '@/components/events/previousEvents'
import Text from '@/components/ui/text'

export default function InvitationPage() {
  return (
    <>
      <div className='min-h-[calc(100dvh-222px)] md:min-h-[calc(100dvh-322px)] flex flex-col items-center justify-center gap-20'>
        <Event />

        <div className='flex flex-col gap-10 w-full'>
          <Text variant='headingS' className='font-light' t>
            events.previous_events
          </Text>

          <PreviousEvents />
        </div>
      </div>
    </>
  )
}
