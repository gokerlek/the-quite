'use client'

import { useTranslations } from 'use-intl'

export default function JourneyDesignPage() {
  const t = useTranslations('journey_design')

  return (
    <div className='min-h-screen bg-offblack-50 text-offblack-950 px-8 py-20'>
      <div className='max-w-6xl mx-auto'>Journey Design Page</div>
    </div>
  )
}
