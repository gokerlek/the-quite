'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'use-intl'

import ScrollReveal from '@/components/ui/ScrollReveal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const logoRef = useRef<HTMLImageElement>(null)
  const redSectionRef = useRef<HTMLElement>(null)
  const greenSectionRef = useRef<HTMLElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations

  useEffect(() => {
    if (!logoRef.current || !redSectionRef.current || !greenSectionRef.current) return

    // Animasyon ayarları
    const LOGO_TOP_MARGIN = 100 // Logo ile ekran üstü arasındaki boşluk
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
      top: `${LOGO_TOP_MARGIN + logoHeight / 2}px`,
      opacity: LOGO_OPACITY,
      duration: 2,
      ease: 'none',
    })

      // 2. Logo üstte sabit kalır (red section geçerken)
      .to(logoElement, {
        top: `${LOGO_TOP_MARGIN + logoHeight / 2}px`,
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={mainContainerRef} className='relative'>
      {/* Logo - fixed position, responsive */}
      <Image
        ref={logoRef}
        src='/about/bg.svg'
        alt='logo'
        width={636}
        height={636}
        className='w-[clamp(200px,50vw,636px)] h-auto'
      />

      {/* İlk scroll alanı */}
      <section className='h-[200vh] w-full' />

      {/* Red section - z-10 (logo üstünden geçer) */}
      <section ref={redSectionRef} id='red' className='relative w-full h-[200vh] z-10'>
        <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10}>
          {t('about.desc')}
        </ScrollReveal>
      </section>

      {/* Green section - z-10 */}
      <section
        ref={greenSectionRef}
        id='green'
        className='relative w-full h-screen bg-green-400 z-10 '
      />
    </div>
  )
}
