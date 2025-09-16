'use client'

import Image from 'next/image'

import { useTranslations } from 'use-intl'

import ScrollReveal from '@/components/ui/ScrollReveal'

export default function AboutPage() {
  const t = useTranslations()

  return (
    <div>
      <section id='bg_logo'>
        <Image src='/about/bg.svg' alt='logo' width={636} height={636} />
      </section>

      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
        textClassName='font-lemon text-[48px] font-light text-center'
      >
        {t('about.desc')}
      </ScrollReveal>
    </div>
  )
}
