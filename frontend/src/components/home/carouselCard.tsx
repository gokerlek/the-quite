import Image from 'next/image'
import Link from 'next/link'

import Text from '@/components/ui/text'

interface CarouselCardProps {
  img: string
  title: string
  description: string
  href: string
  isActive: boolean
}

export const CarouselCard = ({ img, title, description, href, isActive }: CarouselCardProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-12 sm:px-12 px-1 py-24 max-w-[420px] w-full min-w-[375px] sm:min-w-[calc((1440px-120px)/3)]'>
      <Image src={img} alt={title} width={214} height={214} />

      <Text
        variant={isActive ? 'headingL' : 'headingM'}
        weight={300}
        className='break-all text-center whitespace-pre-line'
        t
      >
        {title}
      </Text>

      <Text variant='pS' weight={400} className='break-words text-center'>
        {isActive ? description : ''}
      </Text>

      <Link href={href}>
        <Text variant='pM' t>
          discover
        </Text>
      </Link>
    </div>
  )
}
