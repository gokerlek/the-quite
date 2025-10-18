import { forwardRef } from 'react'
import Image from 'next/image'

import { useTranslations } from 'use-intl'

import { cn } from '@/lib/utils'

interface CarouselCardProps {
  img: string
  title: string
  subtitle: string
  description: string
  href: string
  isActive: boolean
}

export const CarouselCard = forwardRef<HTMLDivElement, CarouselCardProps>(
  ({ img, title, description, subtitle, isActive }, ref) => {
    const t = useTranslations()

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex snap-center flex-col items-center justify-center gap-12 px-6 py-8 w-[22.5rem] min-w-[22.5rem] h-[37.5rem] ',
          {
            'opacity-40': !isActive,
            'opacity-100': isActive,
          },
        )}
        style={{ scrollSnapAlign: 'center' }}
      >
        <div className='relative w-[8.75rem] h-[8.75rem]'>
          <Image
            src={img}
            alt={title}
            fill
            className='object-cover' // gerekirse cover/contain
          />
        </div>

        <div className='flex flex-col justify-start gap-12 flex-1'>
          <div
            className={cn('break-all text-center whitespace-preLine transition-all duration-1000', {
              'heading-m-medium': isActive,
              'heading-m': !isActive,
            })}
          >
            {t(title)}
          </div>

          <div className='flex flex-col gap-2'>
            <div className='break-words text-center h9 text-richcarmine-600'>{t(subtitle)}</div>

            <div className='break-words text-center p-s'>{t(description)}</div>
          </div>
        </div>
      </div>
    )
  },
)

CarouselCard.displayName = 'CarouselCard'
