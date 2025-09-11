import { CarouselCard } from '@/components/home/carouselCard'

const homeCarouselData = [
  {
    img: '/home/community-events.svg',
    title: 'community_events',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
]

export const HomeCarousel = () => {
  return (
    <div className='min-h-screen px-6 py-24 container mx-auto max-w-[1440px]'>
      <div className='flex  gap-6 px-20 overflow-x-scroll max-w-[1440px] mx-auto'>
        {homeCarouselData.map((data) => (
          <CarouselCard {...data} key={data.title} />
        ))}
      </div>
    </div>
  )
}
