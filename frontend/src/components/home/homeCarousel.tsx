'use client'

import { useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { CarouselCard } from '@/components/home/carouselCard'

const homeCarouselData = [
  {
    img: '/home/community-events.svg',
    title: 'community_events',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/journey-design.svg',
    title: 'journey_design',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
  {
    img: '/home/event-organization.svg',
    title: 'event_organization',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin hendrerit porta. ',
    href: '/events',
  },
]

export const HomeCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const totalCards = homeCarouselData.length

  // Sonsuz döngü illüzyonu için 3 kopya
  const extendedData = [...homeCarouselData, ...homeCarouselData, ...homeCarouselData]

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Başlangıç pozisyonunu ayarla - ilk kartı merkeze al
      gsap.set(containerRef.current, { x: 0 })
    },
    { scope: containerRef },
  )

  const animateToCard = (direction: 'next' | 'prev') => {
    if (!containerRef.current || isAnimating) return

    setIsAnimating(true)

    // Dinamik card width hesaplama
    const firstCard = containerRef.current.children[0] as HTMLElement

    if (!firstCard) {
      setIsAnimating(false)

      return
    }

    const cardWidth = firstCard.offsetWidth + 24

    const currentX = gsap.getProperty(containerRef.current, 'x') as number

    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % totalCards)

      gsap.to(containerRef.current, {
        x: currentX - cardWidth,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          if (!containerRef.current) {
            setIsAnimating(false)

            return
          }

          // İlk kartı sona taşı
          const firstChild = containerRef.current.children[0]

          if (firstChild) {
            containerRef.current.appendChild(firstChild)
            gsap.set(containerRef.current, { x: currentX })
          }

          setIsAnimating(false)
        },
      })
    } else {
      setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1))

      gsap.to(containerRef.current, {
        x: currentX + cardWidth,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          if (!containerRef.current) {
            setIsAnimating(false)

            return
          }

          // Son kartı başa taşı
          const lastChild = containerRef.current.children[containerRef.current.children.length - 1]

          if (lastChild) {
            containerRef.current.insertBefore(lastChild, containerRef.current.children[0])
            gsap.set(containerRef.current, { x: currentX })
          }

          setIsAnimating(false)
        },
      })
    }
  }

  const handleNext = () => animateToCard('next')
  const handlePrev = () => animateToCard('prev')

  return (
    <div className='min-h-screen px-6 py-24 mx-auto max-w-[1440px]'>
      {/* Navigation buttons */}
      <div className='flex justify-center gap-4 mb-8'>
        <button
          onClick={handlePrev}
          className='px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors'
          disabled={isAnimating}
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          className='px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors'
          disabled={isAnimating}
        >
          Next
        </button>
      </div>

      <div className='overflow-hidden w-full mx-auto relative h-[730px] flex justify-center'>
        {/* Cards container - flex ile otomatik ortalanır */}
        <div
          ref={containerRef}
          className='flex gap-6 px-20 items-center'
          style={{ width: 'fit-content' }}
        >
          {extendedData.map((data, index) => (
            <div key={`${data.title}-${index}`}>
              <CarouselCard {...data} isActive={currentIndex + 1 === index % totalCards} />
            </div>
          ))}
        </div>

        {/* Active card area indicator - viewport'un tam ortasında */}
        <div
          id='active-card-area'
          className='fixed inset-y-0 h-full left-1/2 transform -translate-x-1/2 max-w-[420px] w-full border border-red-500 border-dashed pointer-events-none z-10'
          style={{ top: 'auto', bottom: 'auto', height: '730px' }}
        ></div>
      </div>
    </div>
  )
}
