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
    <div className='flex flex-col items-center justify-center'>
      <Image src={img} alt={title} width={214} height={214} />

      <Text variant='headingL' weight={300} className='mt-4' t>
        {title}
      </Text>

      <Text variant='pS' weight={400} className='mt-4' t>
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
