'use client'

import { MobilEvent } from '@/components/event-organization/MobileEvent'
import { WebEvent } from '@/components/event-organization/webEvent'
import { useContainerSize } from '@/hooks/useContainerSize'
import { useMobileDetection } from '@/hooks/useMobileDetection'

export default function EventOrganizationPage() {
  const isMobile = useMobileDetection()
  const { containerSize } = useContainerSize({ isWideScreen: isMobile })

  return (
    <div className='min-h-dvh flex justify-center items-center relative'>
      <div
        style={{
          width: containerSize.width,
          height: containerSize.height,
        }}
        className='border-offblack-950 border relative overflow-hidden'
      >
        <section id='temple-container' className='absolute inset-0 z-[9] '>
          {isMobile ? <MobilEvent /> : <WebEvent />}
        </section>
      </div>
    </div>
  )
}
