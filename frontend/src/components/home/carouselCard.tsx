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

export const CarouselCard = ({ img, title, description, href, isActive }: CarouselCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-12 sm:px-12 px-1 py-24 max-w-[420px] w-full min-w-[375px] sm:min-w-[calc((1440px-120px)/3)] transition-all duration-500',
        {
          'opacity-40': !isActive,
          'opacity-100': isActive,
        },
      )}
    >
      <Image src={img} alt={title} width={214} height={214} />

      <Text
        variant='headingM'
        weight={300}
        className={cn('break-all text-center whitespace-pre-line transition-all duration-500', {
          'text-[32px] leading-[40px]': isActive,
          'text-[24px] leading-[42px]': !isActive,
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
}
