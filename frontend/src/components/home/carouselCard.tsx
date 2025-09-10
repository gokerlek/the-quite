import Image from 'next/image'

import Typography from '@/components/ui/typography'

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

      <Typography variant='h1' weight={300} className='mt-4' t>
        {title}
      </Typography>

      <Typography variant='h1' weight={300} className='mt-4' t>
        {description}
      </Typography>
    </div>
  )
}
