'use client'

import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'

type Props = { onDiscoverAction: () => void }

export function TheQuietDescription({ onDiscoverAction }: Props) {
  const t = useTranslations('preloader')

  const renderFormattedText = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g
    const parts = text.split(regex)

    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className='text-2xl sm:text-4xl'>
          {part}
        </span>
      ) : (
        <span className='text-2xl sm:text-5xl' key={index}>
          {part}
        </span>
      ),
    )
  }

  return (
    <section
      id='the_quiet_description'
      className='absolute left-1/12 top-1/12 flex-col gap-12 items-start opacity-0'
      style={{ display: 'none' }}
    >
      <div className=' font-light uppercase  text-left text-offblack-50 text-balance '>
        {renderFormattedText(t('desc'))}
      </div>

      <Button variant='secondary' onClick={onDiscoverAction}>
        DISCOVER
      </Button>
    </section>
  )
}
