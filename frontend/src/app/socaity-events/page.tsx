'use client'

import { useTranslations } from 'use-intl'

export default function SocietyEventsPage() {
  const t = useTranslations('society_events')

  return (
    <div className='min-h-screen bg-offblack-50 text-offblack-950 px-8 py-20'>
      <div className='max-w-6xl mx-auto'>Society Events Page</div>
    </div>
  )
}
