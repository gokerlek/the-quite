'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useTranslations } from 'use-intl'

import { TeamList } from '@/components/about/teamList'

export default function AboutPage() {
  const logoRef = useRef<HTMLImageElement>(null)
  const redSectionRef = useRef<HTMLElement>(null)
  const greenSectionRef = useRef<HTMLElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
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

    // 1. Logo 50vh -> üstten LOGO_TOP_MARGIN + logo yarısı kadar aşağı, opacity %50
    tl.to(logoElement, {
      top: `${logoHeight / 2}px`,
      opacity: LOGO_OPACITY,
      duration: 2,
      ease: 'none',
    })

      // 2. Logo üstte sabit kalır (red section geçerken)
      .to(logoElement, {
        top: `${logoHeight / 2}px`,
        opacity: LOGO_OPACITY,
        duration: 2,
        ease: 'none',
      })

      // 3. Logo yukarı çıkar ve fade out (green section ortada)
      .to(logoElement, {
        top: `-${logoHeight}px`, // Logo boyutu kadar yukarı çıkar
        opacity: 0,
        duration: 1,
        ease: 'none',
      })

    // Text mask animasyonu
    const splitText = new SplitText(textRef.current.querySelector('h1'), { type: 'lines' })
    const masks: HTMLElement[] = []

    splitText.lines.forEach((line) => {
      const mask = document.createElement('span')

      mask.className = ` size-full absolute bg-offblack-50 left-0 top-0 opacity-80`
      ;(line as HTMLElement).style.position = 'relative'
      line.appendChild(mask)
      masks.push(mask)

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      masks.forEach((mask) => mask.remove())
      splitText.revert()
    }
  }, [])

  return (
    <div ref={mainContainerRef} className='relative'>
      {/* Logo - fixed position, responsive */}
      <div ref={logoRef}>
        <div className='relative w-[39.75rem] h-[39.75rem] '>
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
        <div ref={textRef} className="text-center heading-xl-light max-w-[74rem] px-8'">
          <h1>{t('desc')}</h1>
        </div>
      </section>

      {/* Green section - z-10 */}
      <section
        ref={greenSectionRef}
        id='green'
        className='w-full h-dvh  z-10 flex flex-col  items-center py-20 gap-10'
      >
        <div className='uppercase heading-m-light'>{t('team')}</div>

        <TeamList />
      </section>
    </div>
  )
}
