'use client'

import Event from '@/components/events/event'
import { PreviousEvents } from '@/components/events/previousEvents'

export default function InvitationPage() {
  return (
    <>
      <Event />

      <div className='flex flex-col gap-10 w-full text-xl h-dvh items-center '>
        <PreviousEvents />
      </div>
    </>
  )
}
