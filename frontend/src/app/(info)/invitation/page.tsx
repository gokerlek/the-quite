'use client'

import Event from '@/components/events/event'
import { PreviousEvents } from '@/components/events/previousEvents'

export default function InvitationPage() {
  return (
    <>
      <div className='min-h-[calc(100dvh-222px)] md:min-h-[calc(100dvh-322px)] flex flex-col items-center justify-center gap-5'>
        <Event />

        <div className='min-h-dvh w-full'>
          <PreviousEvents />
        </div>
      </div>
    </>
  )
}
