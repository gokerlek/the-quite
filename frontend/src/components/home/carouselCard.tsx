import { forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
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
          'flex snap-center flex-col items-center justify-center md:py-24 py-3 transition-all duration-1000 max-h-[720px]',
          // Mobile: viewport height minus header space, Desktop: fixed height
          'h-[calc(100dvh-210px)]',
          // Mobile: screen width minus 40px (20px each side), Desktop: 3 cards per view
          'min-w-[calc(100vw-40px)] px-6 md:w-full  md:min-w-[calc((1440px-120px)/3)] md:px-12',
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

        <div className='flex flex-col justify-between flex-1'>
          <Text
            variant='headingM'
            weight={300}
            className={cn(
              'break-all text-center whitespace-pre-line transition-all duration-1000',
              {
                'md:text-[32px] md:leading-[40px] text-[24px] leading-[32px]': isActive,
                'md:text-[24px] md:leading-[32px] text-[18px] leading-[24px]': !isActive,
              },
            )}
            t
          >
            {title}
          </Text>

          <Text variant='pS' weight={400} className='break-words text-center py-5'>
            {description}
          </Text>

          <Link
            href={isActive ? href : '#'}
            onClick={(e) => {
              if (!isActive) {
                e.preventDefault()
              }
            }}
            className={cn(
              buttonVariants({
                variant: 'default',
              }),
              'mx-auto',
              {
                'opacity-0 cursor-default ': !isActive,
              },
            )}
          >
            <Text variant='pM' t>
              discover
            </Text>
          </Link>
        </div>
      </div>
    )
  },
)

CarouselCard.displayName = 'CarouselCard'
