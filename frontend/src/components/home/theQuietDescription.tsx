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
              <span key={partIndex} className='text-base sm:text-4xl font-lemon font-light'>
                {part.slice(2, -2)}
              </span>
            )
          }

          return (
            <span className='text-xl sm:text-5xl font-lemon font-light' key={partIndex}>
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
      className='absolute left-1/12 md:top-1/12 top-1/4 transform  flex-col gap-12 items-start opacity-0'
      style={{ display: 'none' }}
    >
      <div className=' font-light uppercase  text-left text-offblack-50 text-balance md:block hidden '>
        {renderFormattedText(t('desc'))}
      </div>

      <div className=' font-light uppercase  text-left text-offblack-50 md:hidden block '>
        {renderFormattedText(t('desc_mobile'))}
      </div>

      <Button variant='secondary' onClick={onDiscoverAction} className='hidden md:flex'>
        DISCOVER
      </Button>

      <Button
        variant='secondary'
        onClick={onDiscoverAction}
        className='h-9 text-base px-3 flex md:hidden'
      >
        DISCOVER
      </Button>
    </section>
  )
}
