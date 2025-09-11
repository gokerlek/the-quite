import Image from 'next/image'
import Link from 'next/link'

import Text from '@/components/ui/text'

interface CarouselCardProps {
  img: string
  title: string
  description: string
  href: string
}

export const CarouselCard = ({ img, title, description, href }: CarouselCardProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-12 px-12 py-24'>
      <Image src={img} alt={title} width={214} height={214} />

      <Text
        variant='headingM'
        weight={300}
        className='break-all text-center whitespace-pre-line '
        t
      >
        {title}
      </Text>

      <Text variant='pS' weight={400} className='break-words text-center'>
        {description}
      </Text>

      <Link href={href}>
        <Text variant='pM' t>
          discover
        </Text>
      </Link>
    </div>
  )
}
