'use client'

import { useTranslations } from 'use-intl'

export default function EventOrganizationPage() {
  const t = useTranslations('event_organization')

  return (
    <div className='min-h-screen bg-offblack-50 text-offblack-950 px-8 py-20'>
      <div className='max-w-6xl mx-auto'>Event Organization Page</div>
    </div>
  )
}
