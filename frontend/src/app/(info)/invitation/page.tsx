'use client'

import { useTranslations } from 'use-intl'

export default function InvitationPage() {
  const t = useTranslations('invitation')

  return (
    <div className='min-h-[calc(100dvh-222px)] md:min-h-[calc(100dvh-322px)] flex flex-col items-center justify-center p-8'>
      <div className='max-w-4xl mx-auto text-center space-y-8'>
        <h1 className='text-4xl md:text-6xl font-lemon font-light text-richcarmine-800'>
          {t('discover')}
        </h1>

        <div className='space-y-4'>
          <button className='bg-richcarmine-500 text-white px-8 py-3 rounded-lg hover:bg-richcarmine-600 transition-colors'>
            {t('discover')}
          </button>

          <p className='text-sm text-offblack-600'>{t('rsvpNote')}</p>
        </div>
      </div>
    </div>
  )
}
