'use client'

import { useTranslations } from 'use-intl'

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

      <button
        onClick={onDiscoverAction}
        className='bt-white px-5 py-2 bg-offblack-50 text-offblack-950 hover:opacity-80 transform hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer'
      >
        DISCOVER
      </button>
    </section>
  )
}
