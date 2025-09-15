import { forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'

interface CarouselCardProps {
  img: string
  title: string
  description: string
  href: string
  isActive: boolean
}

export const CarouselCard = forwardRef<HTMLDivElement, CarouselCardProps>(
  ({ img, title, description, href, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex snap-center flex-col items-center justify-center md:gap-12 gap-4 md:py-24 py-3 transition-all duration-500 md:border',
          // Mobile: viewport height minus header space, Desktop: fixed height
          'h-[calc(100dvh-210px)] md:h-[720px]',
          // Mobile: screen width minus 40px (20px each side), Desktop: 3 cards per view
          'min-w-[calc(100vw-40px)] px-6 md:w-full md:max-w-[420px] md:min-w-[calc((1440px-120px)/3)] md:px-12',
          {
            'opacity-40': !isActive,
            'opacity-100': isActive,
          },
        )}
      >
        <Image
          src={img}
          alt={title}
          width={214}
          height={214}
          className='object-contain size-40 md:size-[214px]' // gerekirse cover/contain
        />

        <Text
          variant='headingM'
          weight={300}
          className={cn('break-all text-center whitespace-pre-line transition-all duration-500', {
            'md:text-[32px] md:leading-[40px] text-[24px] leading-[32px]': isActive,
            'md:text-[24px] md:leading-[32px] text-[18px] leading-[24px]': !isActive,
          })}
          t
        >
          {title}
        </Text>

        <Text variant='pS' weight={400} className='break-words text-center'>
          {description}
        </Text>

        <Link
          href={isActive ? href : '#'}
          onClick={(e) => {
            if (!isActive) {
              e.preventDefault()
            }
          }}
          className={cn(' px-4 py-2 transition-all duration-500', {
            'opacity-40 cursor-default ': !isActive,
            'bg-offblack-950 text-offblack-50 hover:opacity-80 transform hover:scale-95 ': isActive,
          })}
        >
          <Text variant='pM' t>
            discover
          </Text>
        </Link>
      </div>
    )
  },
)

CarouselCard.displayName = 'CarouselCard'
