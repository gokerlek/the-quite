'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useTranslations } from 'use-intl'

import { MobileTeamList } from '@/components/about/MobileTeamList'
import { TeamList } from '@/components/about/teamList'
import { useMobileDetection } from '@/hooks/useMobileDetection'

declare global {
  interface Window {
    resizeTimeout?: NodeJS.Timeout
  }
}

export default function AboutPage() {
  const isMoble = useMobileDetection()
  const logoRef = useRef<HTMLImageElement>(null)
  const redSectionRef = useRef<HTMLElement>(null)
  const greenSectionRef = useRef<HTMLElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const splitTextRef = useRef<SplitText | null>(null)
  const masksRef = useRef<HTMLElement[]>([])
  const t = useTranslations('about')

  useEffect(() => {
    if (!logoRef.current || !redSectionRef.current || !greenSectionRef.current || !textRef.current)
      return

    // Animasyon ayarları
    const LOGO_OPACITY = 0.1

    // Logo'nun gerçek boyutunu al
    const logoElement = logoRef.current
    const logoHeight = logoElement.offsetHeight

    // Logo'yu fixed position yap - ekranın ortasında başlasın
    gsap.set(logoElement, {
      position: 'fixed',
      top: '50dvh',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      zIndex: 5,
    })

    // Tek timeline ile tüm animasyonu yönet
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // 1. Logo ortada sabit kalır (text animation boyunca)
    tl.to(logoElement, {
      top: '50vh',
      opacity: LOGO_OPACITY,
      duration: 4,
      ease: 'none',
    })

      // 2. Logo yukarı çıkar ve fade out (team section gelince)
      .to(logoElement, {
        top: `-${logoHeight}px`,
        opacity: 0,
        duration: 1,
        ease: 'none',
      })

    // Text mask animasyonu - Responsive
    const initTextAnimation = () => {
      const h1Element = textRef.current?.querySelector('h1')

      if (!h1Element) return

      // Text ile ilgili ScrollTrigger'ları temizle
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger && h1Element.contains(trigger.vars.trigger as Element)) {
          trigger.kill()
        }
      })

      // Önceki animation'ı temizle
      if (splitTextRef.current) {
        splitTextRef.current.revert()
      }

      masksRef.current.forEach((mask) => mask.remove())
      masksRef.current = []

      // Yeni SplitText oluştur
      splitTextRef.current = new SplitText(h1Element, { type: 'lines' })

      splitTextRef.current.lines.forEach((line) => {
        const mask = document.createElement('span')

        mask.className = ` size-full absolute bg-offblack-50 left-0 top-0 opacity-80`
        ;(line as HTMLElement).style.position = 'relative'
        line.appendChild(mask)
        masksRef.current.push(mask)

        gsap.to(mask, {
          scaleX: 0,
          transformOrigin: 'right center',
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            scrub: true,
            start: 'top center',
            end: 'bottom center',
          },
        })
      })
    }

    // İlk kez çalıştır
    initTextAnimation()

    // Resize event listener
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(window.resizeTimeout)
      window.resizeTimeout = setTimeout(() => {
        initTextAnimation()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      masksRef.current.forEach((mask) => mask.remove())

      if (splitTextRef.current) {
        splitTextRef.current.revert()
      }

      window.removeEventListener('resize', handleResize)
      clearTimeout(window.resizeTimeout)
    }
  }, [])

  return (
    <div ref={mainContainerRef} className='relative'>
      {/* Logo - fixed position, responsive */}
      <div ref={logoRef}>
        <div className='relative md:w-[39.75rem] md:h-[39.75rem] w-[15rem] h-[15rem]'>
          <Image src='/about/bg.svg' alt='logo' fill className='object-cover' />
        </div>
      </div>

      {/* İlk scroll alanı */}
      <section className='h-[200vh] w-full' />

      {/* Red section - z-10 (logo üstünden geçer) */}
      <section
        ref={redSectionRef}
        id='red'
        className='relative w-full h-fit z-10 flex items-center justify-center'
      >
        <div
          ref={textRef}
          className='text-center md:heading-xl-light heading-s-light max-w-[74rem] md:px-0 px-4'
        >
          <h1>{t('desc')}</h1>
        </div>
      </section>

      {/* Green section - z-10 */}
      <section
        ref={greenSectionRef}
        id='green'
        className='w-full h-dvh  z-10 flex flex-col  items-center py-20 gap-10'
      >
        <div className='uppercase heading-xs-light md:heading-m-light'>{t('team')}</div>

        {isMoble ? <MobileTeamList /> : <TeamList />}
      </section>
    </div>
  )
}
