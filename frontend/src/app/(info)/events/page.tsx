'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EventsPage() {
  const words = useMemo(() => ['world', 'moment', 'action', 'science'], [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const currentWordRef = useRef<HTMLSpanElement>(null)
  const nextWordRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const agustRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrollAccumulator = 0
    const scrollThreshold = 100

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // Aşağı scroll: son kelimeye ulaştıysak normal scroll'a izin ver
      if (currentIndex === words.length - 1 && e.deltaY > 0) {
        return // Normal scroll devam etsin
      }

      // Yukarı scroll: sayfa en üstte değilse normal scroll'a izin ver
      if (e.deltaY < 0 && scrollTop > 0) {
        return // Önce normal scroll ile sayfa en üste çıksın
      }

      // Sayfa en üstte ve yukarı scroll: kelimeler geriye gitsin
      if (e.deltaY < 0 && scrollTop === 0 && currentIndex > 0) {
        e.preventDefault()

        if (isAnimating) return

        scrollAccumulator += e.deltaY

        if (Math.abs(scrollAccumulator) >= scrollThreshold) {
          const newIndex = currentIndex - 1

          animateWordChange(newIndex, 'up')
          scrollAccumulator = 0
        }

        return
      }

      // Normal kelime değişimi (aşağı)
      if (e.deltaY > 0 && currentIndex < words.length - 1) {
        e.preventDefault()

        if (isAnimating) return

        scrollAccumulator += e.deltaY

        if (Math.abs(scrollAccumulator) >= scrollThreshold) {
          const newIndex = currentIndex + 1

          animateWordChange(newIndex, 'down')
          scrollAccumulator = 0
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentIndex, isAnimating, words.length])

  useEffect(() => {
    if (!agustRef.current || !posterRef.current) return

    ScrollTrigger.create({
      trigger: agustRef.current,
      start: 'top top',
      end: '+=1000',
      scrub: 2,
      pin: agustRef.current.parentElement,
      onUpdate: (self) => {
        const progress = self.progress
        const width = 100 - progress * 60

        gsap.set(posterRef.current, {
          width: `${width}%`,
          transformOrigin: 'top center',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const animateWordChange = (newIndex: number, direction: 'up' | 'down') => {
    if (!currentWordRef.current || !nextWordRef.current || !containerRef.current) return

    setIsAnimating(true)

    // Yeni kelimenin genişliğini ölç
    const tempSpan = document.createElement('span')

    tempSpan.className =
      'text-5xl text-richcarmine-500 whitespace-nowrap font-montagne absolute opacity-0'
    tempSpan.style.visibility = 'hidden'
    tempSpan.textContent = words[newIndex]
    document.body.appendChild(tempSpan)
    const newWidth = tempSpan.getBoundingClientRect().width

    document.body.removeChild(tempSpan)

    const currentY = direction === 'up' ? -100 : 100
    const nextY = direction === 'up' ? 100 : -100

    // Yeni kelimeyi hazırla
    nextWordRef.current.textContent = words[newIndex]
    gsap.set(nextWordRef.current, { yPercent: nextY, opacity: 0, scale: 0.5 })

    gsap
      .timeline({
        onComplete: () => {
          // Animasyon bitince rolleri değiştir
          const temp = currentWordRef.current

          currentWordRef.current = nextWordRef.current
          nextWordRef.current = temp
          setCurrentIndex(newIndex)
          setIsAnimating(false)
        },
      })
      .to(currentWordRef.current, {
        yPercent: currentY,
        opacity: 0,
        scale: 0.1,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to(
        containerRef.current,
        {
          width: newWidth,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        nextWordRef.current,
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
  }

  return (
    <div>
      <section className=' min-h-[calc(100dvh-222px)] md:min-h-[calc(100dvh-322px)] flex items-center justify-center'>
        <div className='md:text-5xl text-3xl  flex items-center justify-center gap-4 font-[400]'>
          <span>The</span>

          <div ref={containerRef} className='h-32 w-fit flex items-center justify-center'>
            <div className='grid grid-cols-1 grid-rows-1 place-items-center w-fit h-full'>
              <span
                ref={currentWordRef}
                className='col-start-1 row-start-1  text-richcarmine-500 whitespace-nowrap font-montagne'
              >
                {words[currentIndex]}
              </span>

              <span
                ref={nextWordRef}
                className='col-start-1 row-start-1 text-richcarmine-500 whitespace-nowrap font-montagne'
              >
                {words[currentIndex]}
              </span>
            </div>
          </div>

          <span>around us.</span>
        </div>
      </section>

      <section className='flex flex-col items-center justify-start sticky top-0 text-5xl md:text-[120px] font-[300] font-lemon'>
        <Image src={'/events/icon.svg'} alt={'icon'} width={456} height={456} className='mb-20' />

        <div ref={agustRef}>AGUST</div>

        <div className='flex gap-5 items-center justify-center w-full'>
          <div className=' min-w-max'>10</div>

          <div ref={posterRef} className='aspect-2/3 w-full bg-red-400'></div>

          <div className=' min-w-max'>26</div>
        </div>
      </section>
    </div>
  )
}
