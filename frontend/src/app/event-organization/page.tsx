'use client'

import { WebEvent } from '@/components/event-organization/webEvent'
import { useContainerSize } from '@/hooks/useContainerSize'

export default function EventOrganizationPage() {
  const { containerSize } = useContainerSize()

  return (
    <div className='min-h-screen flex justify-center items-center relative'>
      <div
        style={{
          width: containerSize.width,
          height: containerSize.height,
        }}
        className='border-offblack-950 border relative overflow-hidden'
      >
        <section id='temple-container' className='absolute inset-0 z-[9] '>
          <WebEvent />
        </section>
      </div>
    </div>
  )
}
