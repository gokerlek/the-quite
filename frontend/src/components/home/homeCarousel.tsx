import { CarouselCard } from '@/components/home/carouselCard'

const homeCarouselData = [
  {
    img: '/home/community-events.svg',
    title: 'community_events',
    description: 'description',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design',
    description: 'description',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization',
    description: 'description',
    href: '/events',
  },
]

export const HomeCarousel = () => {
  return (
    <div className='min-h-screen px-6 py-24 container mx-auto max-w-[1440px]'>
      <div className='grid grid-cols-3'>
        {homeCarouselData.map((data) => (
          <CarouselCard {...data} key={data.title} />
        ))}
      </div>
    </div>
  )
}
