import { forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useTranslations } from 'use-intl'

import { buttonVariants } from '@/components/ui/button'
import { useMobileDetection } from '@/hooks/useMobileDetection'
import { cn } from '@/lib/utils'

interface CarouselCardProps {
  img: string
  title: string
  subtitle: string
  description: string
  href: string
  isActive: boolean
}

export const CarouselCardMobile = forwardRef<HTMLDivElement, CarouselCardProps>(
  ({ img, title, description, subtitle, isActive, href }, ref) => {
    const t = useTranslations()
    const isMobile = useMobileDetection()

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center gap-6 w-[296px] px-5 py-6  h-[453px] ',
          {
            'opacity-40': !isActive,
            'opacity-100': isActive,
          },
        )}
      >
        <div className='relative md:w-[8.75rem] md:h-[8.75rem] w-24 h-24'>
          <Image
            src={img}
            alt={title}
            fill
            className='object-cover' // gerekirse cover/contain
          />
        </div>

        <div className='flex flex-col justify-start gap-12 flex-1'>
          <div
            className={cn(
              'break-all text-center whitespace-preLine whitespace-break-spaces transition-all duration-1000 uppercase',
              {
                'md:heading-m-medium heading-s': isActive,
                'md:heading-m heading-s': !isActive,
              },
            )}
          >
            {t(title)}
          </div>

          <div className='flex flex-col gap-2'>
            <div className='break-words text-center h10 md:h9 text-richcarmine-600'>
              {t(subtitle)}
            </div>

            <div className='break-words text-center p-xs md:p-s'>{t(description)}</div>
          </div>
        </div>

        {isMobile && (
          <Link className={cn(buttonVariants(), 'h-9 text-base px-2')} href={href}>
            {t('discover')}
          </Link>
        )}
      </div>
    )
  },
)

CarouselCardMobile.displayName = 'CarouselCardMobile'
