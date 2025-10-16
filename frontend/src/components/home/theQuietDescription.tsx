'use client'

import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'

type Props = { onDiscoverAction: () => void }

export function TheQuietDescription({ onDiscoverAction }: Props) {
  const t = useTranslations('preloader')

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIndex) => (
      <div key={lineIndex}>
        {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <span key={partIndex} className='text-2xl sm:text-4xl font-lemon font-light'>
                {part.slice(2, -2)}
              </span>
            )
          }

          return (
            <span className='text-2xl sm:text-5xl font-lemon font-light' key={partIndex}>
              {part}
            </span>
          )
        })}
      </div>
    ))
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
